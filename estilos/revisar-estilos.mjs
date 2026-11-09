// Revisión «estilos» de Telivia: corre Stylelint con la escala R29 (stylelint.config.mjs) y
// marca solo los problemas en líneas nuevas o tocadas del PR, para no frenar por lo heredado.
//   node revisar-estilos.mjs <commit-base> <commit-nuevo>
// Se corre desde la raíz del repo revisado. Respeta su .stylelintignore si lo tiene.
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import stylelint from 'stylelint';

const EXTENSIONES = /\.(css|html?)$/i;
const FUERA = /(^|\/)(node_modules|vendor|dist)\/|\.min\.css$/i;
const CONFIG = fileURLToPath(new URL('./stylelint.config.mjs', import.meta.url));

// Lee un diff unificado con -U0 y devuelve { archivo: Set(líneas nuevas o tocadas) }.
export function lineasNuevas(diff) {
  const mapa = {};
  let actual = null;
  for (const linea of diff.split('\n')) {
    const archivo = linea.match(/^\+\+\+ b\/(.+)$/);
    if (archivo) {
      actual = archivo[1];
      continue;
    }
    if (linea.startsWith('+++ ')) actual = null;
    const tramo = linea.match(/^@@ -\S+ \+(\d+)(?:,(\d+))? @@/);
    if (!tramo || !actual) continue;
    const desde = Number(tramo[1]);
    const cuantas = tramo[2] === undefined ? 1 : Number(tramo[2]);
    mapa[actual] ??= new Set();
    for (let n = desde; n < desde + cuantas; n++) mapa[actual].add(n);
  }
  return mapa;
}

export function archivosARevisar(mapa) {
  return Object.keys(mapa).filter((f) => EXTENSIONES.test(f) && !FUERA.test(f) && mapa[f].size);
}

// Deja solo los avisos de Stylelint que caen en líneas nuevas o tocadas.
export function filtrar(resultados, mapa, raiz) {
  const problemas = [];
  for (const r of resultados) {
    const archivo = path.relative(raiz, r.source).split(path.sep).join('/');
    for (const w of r.warnings) {
      if (mapa[archivo]?.has(w.line)) problemas.push({ archivo, ...w });
    }
  }
  return problemas;
}

const limpiar = (texto) => texto.replace(/\s*\([\w/-]+\)$/, '').replace(/[\r\n]+/g, ' ');

function reportar(problemas) {
  for (const p of problemas) {
    const texto = limpiar(p.text);
    console.log(`::error file=${p.archivo},line=${p.line},col=${p.column}::${texto}`);
    console.log(`${p.archivo}:${p.line}:${p.column}  ${texto}  [${p.rule}]`);
  }
  const total = problemas.length;
  const resumen = `\n${total} problema(s) de escala R29 en líneas nuevas.`;
  console.log(total ? resumen : 'Estilos: todo en escala R29.');
}

async function main([base, nuevo]) {
  if (!base || !nuevo) throw new Error('Uso: node revisar-estilos.mjs <base> <nuevo>');
  const argumentos = ['diff', '-U0', '--no-color', '--diff-filter=AMR', `${base}...${nuevo}`];
  const diff = execFileSync('git', argumentos, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  const mapa = lineasNuevas(diff);
  const archivos = archivosARevisar(mapa);
  if (!archivos.length) return reportar([]);
  const raiz = process.cwd();
  const { results } = await stylelint.lint({ files: archivos, configFile: CONFIG, cwd: raiz,
    allowEmptyInput: true });
  const problemas = filtrar(results, mapa, raiz);
  reportar(problemas);
  if (problemas.length) process.exitCode = 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch((e) => {
    console.error(`::error::${e.message}`);
    process.exitCode = 2;
  });
}
