// Revisor de forma de Telivia Labs. PR: título, secciones, tamaño y tarea enlazada.
// Tareas (issues): campos obligatorios. Sin librerías (Node 22). Las funciones son puras;
// main() solo lee el evento de GitHub, pide los archivos del PR y escribe el resultado.
import { appendFileSync, readFileSync, realpathSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export const MAX_TITULO = 72;
export const MAX_LINEAS = 400;
// Código nuevo o tocado. Las 50 líneas por función las revisa ESLint (paso «limites»).
export const LIMITES = { linea: 100, archivo: 300, funcion: 50 };
const CODIGO = /\.(js|jsx|mjs|cjs|ts|tsx)$/;
const TIPOS = 'feat|fix|perf|refactor|test|docs|build|ci|chore|revert';
const TITULO = new RegExp(`^(${TIPOS})(\\([a-z0-9][a-z0-9./-]*\\))?!?: (\\S.*)$`);
const ESPANOL = /\b(el|los|las|del|para|que|una|unos|por|cuando|desde|y)\b/i;
export const SECCIONES = ['Qué cambia', 'Por qué', 'Cómo se probó', 'Cómo se revierte', 'Serie',
  'Agente', 'Tarea que cierra'];
export const AGENTES_PR = ['Cerebro', 'Dexter']; // Cerebro es Claude; Dexter es Codex
export const CAMPOS_TAREA = ['Qué', 'Por qué', 'Qué debe ser siempre cierto',
  'Criterios de aceptación', 'Depende de', 'Tamaño', 'Agente', 'Riesgos'];
export const TAMANOS = ['S (hasta 100 líneas)', 'M (hasta 250)', 'L (hasta 400)'];
export const AGENTES = ['Cerebro (Claude)', 'Dexter (Codex)', 'Juan'];
const GENERADOS = ['package-lock.json', 'pnpm-lock.yaml', 'yarn.lock', '*.lock', 'dist/',
  '*.min.js', '*.min.css', '*.map', '*.snap', '*.png', '*.jpg', '*.jpeg', '*.webp', '*.gif',
  '*.ico', '*.svg', '*.woff', '*.woff2'];
const CLAVE_CIERRE = '(close[sd]?|fix(e[sd])?|resolve[sd]?)';
const ENLACE = new RegExp(`\\b${CLAVE_CIERRE}\\s*:?\\s+(([\\w.-]+/[\\w.-]+)?#\\d+\\b|`
  + 'https://github\\.com/[\\w.-]+/[\\w.-]+/issues/\\d+)', 'i');

const sinComentarios = (s) => String(s || '')
  .replace(/<!--[\s\S]*?-->/g, '').replace(/\r\n/g, '\n');

/** Título: Conventional Commits en inglés, máximo 72 caracteres. Devuelve sus fallas. */
export function revisarTitulo(titulo) {
  const t = String(titulo || '').trim();
  const fallas = [];
  if (t.length > MAX_TITULO)
    fallas.push(`El título tiene ${t.length} caracteres; el máximo es ${MAX_TITULO}.`);
  const m = TITULO.exec(t);
  if (!m) {
    const tipos = TIPOS.replaceAll('|', ', ');
    const ej = '«tipo(alcance): description»';
    return [...fallas, `El título no sigue Conventional Commits: ${ej} (${tipos}).`];
  }
  const desc = m[3];
  const ingles = 'El título debe ir en inglés';
  if (/[^\x20-\x7E]/.test(t)) fallas.push(`${ingles}: lleva tildes, eñes u otros signos.`);
  else if (ESPANOL.test(desc)) fallas.push(`${ingles}: lleva palabras en español.`);
  if (/^[A-Z]/.test(desc)) fallas.push('La descripción del título va en minúsculas.');
  if (/\.$/.test(desc)) fallas.push('La descripción del título no termina en punto.');
  return fallas;
}

/** Parte un texto Markdown en { encabezado: contenido } por los encabezados de nivel 2 o 3. */
export function secciones(texto) {
  const out = {};
  let actual = null;
  let enCodigo = false; // un «## » dentro de un bloque de código no abre sección
  for (const l of sinComentarios(texto).split('\n')) {
    if (/^\s*```/.test(l)) enCodigo = !enCodigo;
    const h = !enCodigo && /^#{2,3} /.test(l) ? l.replace(/^#+/, '').trim() : null;
    if (h) {
      actual = h;
      out[actual] = '';
    } else if (actual) out[actual] += l + '\n';
  }
  return out;
}

const vacio = (s) => !String(s || '').trim();
/** Lo que hay dentro de cada bloque de código («```»), sin regex que puedan atascarse. */
function bloquesCodigo(s) {
  const bloques = [];
  let actual = null;
  for (const l of String(s).split('\n')) {
    if (l.trim().startsWith('```')) {
      if (actual === null) actual = [];
      else bloques.push(actual.join('\n')), (actual = null);
    } else if (actual) actual.push(l);
  }
  return bloques;
}
const ROTULO = /^(antes|despu[eé]s):\s*$/i;
const conSalida = (b) => b.split('\n').some((l) => l.trim() && !ROTULO.test(l.trim()));

/** «3 de 14» → [3, 14], o null. Por palabras, sin regex que puedan atascarse. */
function nDeM(texto) {
  const w = String(texto || '').split(/\s/).filter(Boolean);
  const i = w.indexOf('de');
  const numero = (x) => (/^\d/.test(x || '') ? Number.parseInt(x, 10) : NaN);
  const [n, m] = [numero(w[i - 1]), numero(w[i + 1])];
  return i > 0 && n >= 0 && m >= 0 ? [n, m] : null;
}

/** Cuerpo del PR: secciones de la plantilla, con salida real, «N de M» y la tarea que cierra. */
export function revisarCuerpo(cuerpo) {
  const s = secciones(cuerpo);
  const fallas = [];
  for (const nombre of SECCIONES) {
    if (!(nombre in s)) fallas.push(`Falta la sección «## ${nombre}».`);
    else if (vacio(s[nombre])) fallas.push(`La sección «${nombre}» está vacía.`);
  }
  const probo = s['Cómo se probó'];
  if (!vacio(probo) && !bloquesCodigo(probo).some(conSalida))
    fallas.push('«Cómo se probó» necesita la salida real dentro de un bloque de código (```).');
  const serie = nDeM(s.Serie);
  if (!vacio(s.Serie) && (!serie || serie[0] < 1 || serie[0] > serie[1]))
    fallas.push('«Serie» debe decir «N de M», por ejemplo «1 de 1» o «3 de 14».');
  if (!vacio(s.Agente) && !AGENTES_PR.includes(s.Agente.trim()))
    fallas.push('«Agente» debe decir Cerebro (Claude) o Dexter (Codex).');
  if (!vacio(s['Tarea que cierra']) && !ENLACE.test(s['Tarea que cierra']))
    fallas.push('«Tarea que cierra» debe enlazar una tarea: «Closes #12»'
      + ' (GitHub solo la cierra con Closes, Fixes o Resolves).');
  return fallas;
}

/** ¿Es generado (o imagen de marca) y no cuenta? «dir/», «*.ext» o el nombre exacto. */
export function esGenerado(ruta, extra = []) {
  const nombre = ruta.split('/').pop();
  return [...GENERADOS, ...extra].some((p) => {
    if (p.endsWith('/')) return ruta.startsWith(p) || ruta.includes('/' + p);
    if (p.startsWith('*')) return ruta.endsWith(p.slice(1));
    return nombre === p || ruta === p;
  });
}

/** Líneas cambiadas (sumadas + quitadas) sin lo generado ni los archivos borrados completos
 * (Juan, 8 nov 2026). archivos: [{ filename, additions, deletions, status }]. */
export function contarLineas(archivos, extra = []) {
  let contadas = 0;
  let ignoradas = 0;
  for (const a of archivos) {
    const n = (a.additions || 0) + (a.deletions || 0);
    if (esGenerado(a.filename, extra) || a.status === 'removed') ignoradas += n;
    else contadas += n;
  }
  return { contadas, ignoradas };
}

/** Código nuevo: líneas sumadas de más de 100 caracteres y archivos nuevos de más de 300 líneas
 * (sin blancas ni comentarios). Lee el «patch» de cada archivo; lo generado no cuenta. */
export function revisarLimites(archivos, extra = []) {
  const fallas = [];
  for (const a of archivos) {
    if (!CODIGO.test(a.filename) || esGenerado(a.filename, extra) || !a.patch) continue;
    const sumadas = a.patch.split('\n').filter((l) => l.startsWith('+')).map((l) => l.slice(1));
    const largas = sumadas.filter((l) => l.length > LIMITES.linea && !/https?:\/\//.test(l)).length;
    if (largas)
      fallas.push(`${a.filename}: ${largas} líneas nuevas de más de ${LIMITES.linea} caracteres.`);
    const utiles = sumadas.filter((l) => l.trim() && !/^\s*(\/\/|\/?\*)/.test(l)).length;
    if (a.status === 'added' && utiles > LIMITES.archivo)
      fallas.push(`${a.filename}: archivo nuevo de ${utiles} líneas (máximo ${LIMITES.archivo}).`);
  }
  return fallas;
}

/** Todo el PR. Devuelve { fallas, lineas }. */
export function revisarPR({ titulo, cuerpo, archivos = [], extra = [] }) {
  const lineas = contarLineas(archivos, extra);
  const fallas = [...revisarTitulo(titulo), ...revisarCuerpo(cuerpo),
    ...revisarLimites(archivos, extra)];
  if (lineas.contadas > MAX_LINEAS)
    fallas.push(`El PR cambia ${lineas.contadas} líneas sin contar lo generado;`
      + ` el máximo es ${MAX_LINEAS}. Pártelo en PR «N de M».`);
  return { fallas, lineas };
}

/** Tarea (issue): cada campo obligatorio lleno, agente y tamaño de la lista del formulario. */
export function revisarTarea(cuerpo) {
  const s = secciones(cuerpo);
  const val = (c) => ((s[c] || '').trim() === '_No response_' ? '' : (s[c] || '').trim());
  const fallas = [];
  for (const c of CAMPOS_TAREA) {
    if (!(c in s)) fallas.push(`Falta el campo «${c}».`);
    else if (!val(c)) fallas.push(`El campo «${c}» está vacío.`);
  }
  const fuera = (c, lista) => val(c) && !lista.includes(val(c));
  if (fuera('Agente', AGENTES)) fallas.push(`«Agente» debe ser: ${AGENTES.join(', ')}.`);
  if (fuera('Tamaño', TAMANOS))
    fallas.push(`«Tamaño» debe ser S, M o L (hasta ${MAX_LINEAS}); si no, son varias tareas.`);
  return fallas;
}

async function archivosDelPR(repo, n, token) {
  const out = [];
  for (let pag = 1; pag <= 30; pag++) {
    const url = `https://api.github.com/repos/${repo}/pulls/${n}/files?per_page=100&page=${pag}`;
    const r = await fetch(url, { headers: { Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json', 'User-Agent': 'telivia-forma' } });
    if (!r.ok) throw new Error(`GitHub ${r.status} al leer los archivos del PR.`);
    const lote = await r.json();
    out.push(...lote);
    if (lote.length < 100) return out;
  }
  throw new Error('El PR tiene más de 3,000 archivos: no se puede revisar.');
}

// Actualizaciones automáticas de dependencias: no traen plantilla ni tarea.
export const BOTS_SIN_FORMA = ['dependabot[bot]', 'renovate[bot]'];
export const exento = (pr) => BOTS_SIN_FORMA.includes(pr?.user?.login);

async function main(env = process.env) {
  const evento = JSON.parse(readFileSync(env.GITHUB_EVENT_PATH, 'utf8'));
  const extra = (env.GENERADOS || '').split(',').map((p) => p.trim()).filter(Boolean);
  let fallas;
  let resumen;
  if (exento(evento.pull_request)) {
    fallas = [];
    resumen = 'PR de dependencias: no se revisa la forma.';
  } else if (evento.pull_request) {
    const pr = evento.pull_request;
    const archivos = await archivosDelPR(env.GITHUB_REPOSITORY, pr.number, env.GH_TOKEN);
    const r = revisarPR({ titulo: pr.title, cuerpo: pr.body, archivos, extra });
    fallas = r.fallas;
    resumen = `PR #${pr.number}: ${r.lineas.contadas} líneas que cuentan`
      + ` (${r.lineas.ignoradas} generadas, que no cuentan).`;
  } else if (evento.issue) {
    fallas = revisarTarea(evento.issue.body);
    resumen = `Tarea #${evento.issue.number}.`;
  } else throw new Error('El revisor de forma solo corre en PR y en tareas (issues).');
  const lista = fallas.map((f) => '- ' + f).join('\n');
  const texto = fallas.length
    ? `### Forma: falla\n${resumen}\n\n${lista}\n`
    : `### Forma: bien\n${resumen}\n`;
  console.log(texto);
  if (env.GITHUB_STEP_SUMMARY) appendFileSync(env.GITHUB_STEP_SUMMARY, texto);
  if (env.GITHUB_OUTPUT) appendFileSync(env.GITHUB_OUTPUT, `fallas<<FIN\n${lista}\nFIN\n`);
  return fallas.length ? 1 : 0;
}

const directo = process.argv[1]
  && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href;
if (directo) main().then((c) => { process.exitCode = c; }, (e) => {
  console.error(`Forma: no se pudo revisar. ${e.message}`);
  process.exitCode = 1;
});
