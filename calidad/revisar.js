// Entrada del flujo «calidad» en GitHub Actions: lee los archivos del PR por la API, revisa sus
// líneas nuevas con calidad.js y sale con 1 si hay fallas. Sin librerías fuera de las del lint.
import { appendFileSync } from 'node:fs';
import { revisarCalidad } from './calidad.js';

const { GH_TOKEN, GITHUB_REPOSITORY, PR, REPO_DIR, GITHUB_STEP_SUMMARY } = process.env;
const TERCEROS = (process.env.TERCEROS || '').split(',').map((p) => p.trim()).filter(Boolean);

async function archivosDelPR() {
  const todos = [];
  for (let p = 1; p <= 30; p += 1) {
    const url = `https://api.github.com/repos/${GITHUB_REPOSITORY}/pulls/${PR}/files`
      + `?per_page=100&page=${p}`;
    const r = await fetch(url, { headers: { Authorization: `Bearer ${GH_TOKEN}`,
      Accept: 'application/vnd.github+json', 'User-Agent': 'telivia-calidad' } });
    if (!r.ok) throw new Error(`GitHub ${r.status} al leer los archivos del PR`);
    const hoja = await r.json();
    todos.push(...hoja);
    if (hoja.length < 100) break;
  }
  return todos;
}

const { fallas, revisados } = await revisarCalidad(REPO_DIR, await archivosDelPR(), TERCEROS);
const lista = fallas.map((f) => '- ' + f).join('\n');
const resumen = fallas.length
  ? `### Calidad: ${fallas.length} falla(s)\n\n${lista}\n`
  : `### Calidad: bien · ${revisados} archivo(s) JS/TS\n`;
console.log(resumen);
if (GITHUB_STEP_SUMMARY) appendFileSync(GITHUB_STEP_SUMMARY, resumen);
process.exit(fallas.length ? 1 : 0);
