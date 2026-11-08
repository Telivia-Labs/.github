// Pruebas del revisor de forma: un PR o una tarea bien hechos pasan; cada falta se rechaza.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { CAMPOS_TAREA, revisarCuerpo, revisarLimites, revisarPR, revisarTarea, revisarTitulo,
  esGenerado, exento } from './revisar.js';

const leer = (f) => readFileSync(new URL(`../${f}`, import.meta.url), 'utf8');
const CUERPO = `## Qué cambia
El cobro ya no pasa del saldo.

## Por qué
Hallazgo FIN-03.

## Cómo se probó
\`\`\`text
antes: 1 falla (esperaba 400, recibió 200)
después: 140/140 bien
\`\`\`

## Cómo se revierte
Revertir este PR.

## Serie
1 de 1

## Tarea que cierra
Closes #12
`;
const TAREA = `### Qué\n\nExportar facturas a CSV.\n\n### Para quién\n\nJuan\n\n
### Qué debe ser siempre cierto\n\nEl total del CSV es el del sistema.\n\n
### Carpeta del área\n\nsrc/facturas/\n\n### Fase\n\nFase 1\n\n### Agente\n\nCodex\n\n
### Tamaño estimado\n\n180\n\n### Riesgos\n\nNinguno.\n`;
const hay = (fallas, re) => assert.ok(fallas.some((f) => re.test(f)), `esperaba ${re}: ${fallas}`);

test('título bien: Conventional Commits en inglés', () => {
  assert.deepEqual(revisarTitulo('fix(cobros): cap payment at invoice balance'), []);
  assert.deepEqual(revisarTitulo('feat!: drop node 20'), []);
});
test('título mal: sin tipo, en español, largo, mayúscula o punto', () => {
  hay(revisarTitulo('Arreglo del cobro'), /Conventional Commits/);
  hay(revisarTitulo('fix(cobros): el cobro no pasa del saldo'), /inglés/);
  hay(revisarTitulo('feat: añade exportación'), /inglés/);
  hay(revisarTitulo(`feat: ${'a'.repeat(70)}`), /72/);
  hay(revisarTitulo('fix: Cap payment'), /minúsculas/);
  hay(revisarTitulo('fix: cap payment.'), /punto/);
});
test('cuerpo con todas las secciones pasa', () => assert.deepEqual(revisarCuerpo(CUERPO), []));
test('cada sección que falta se rechaza', () => {
  const todas = ['Qué cambia', 'Por qué', 'Cómo se probó', 'Cómo se revierte', 'Serie',
    'Tarea que cierra'];
  for (const s of todas) {
    const sin = CUERPO.replace(`## ${s}\n`, '');
    hay(revisarCuerpo(sin), new RegExp(`Falta la sección «## ${s}»`));
  }
});
test('la plantilla sin llenar se rechaza', () => {
  const f = revisarCuerpo(leer('.github/pull_request_template.md'));
  hay(f, /«Qué cambia» está vacía/);
  hay(f, /salida real/);
  hay(f, /debe enlazar una tarea/);
});
test('sin salida real, sin «N de M» o sin tarea se rechaza', () => {
  hay(revisarCuerpo(CUERPO.replace(/```text[\s\S]*?```/, 'Corrí las pruebas.')), /salida real/);
  hay(revisarCuerpo(CUERPO.replace('1 de 1', 'único')), /N de M/);
  hay(revisarCuerpo(CUERPO.replace('1 de 1', '3 de 2')), /N de M/);
  hay(revisarCuerpo(CUERPO.replace('Closes #12', 'la del cobro')), /enlazar una tarea/);
  hay(revisarCuerpo(CUERPO.replace('Closes #12', 'Cierra #12')), /enlazar una tarea/);
});
test('acepta enlaces a tareas de otro repo o por dirección', () => {
  assert.deepEqual(revisarCuerpo(CUERPO.replace('Closes #12', 'Fixes Telivia-Labs/livia#3')), []);
  const url = 'Resolves https://github.com/Telivia-Labs/telivia-lab/issues/7';
  assert.deepEqual(revisarCuerpo(CUERPO.replace('Closes #12', url)), []);
});
test('400 líneas pasan; 401 no; lo generado no cuenta', () => {
  const titulo = 'feat(facturas): export invoices to csv';
  const a = (filename, additions, deletions = 0) => ({ filename, additions, deletions });
  const pr = (archivos, extra) => revisarPR({ titulo, cuerpo: CUERPO, archivos, extra });
  assert.deepEqual(pr([a('src/x.js', 300, 100)]).fallas, []);
  hay(pr([a('src/x.js', 301, 100)]).fallas, /401 líneas/);
  const r = pr([a('src/x.js', 50), a('package-lock.json', 5000),
    a('web/dist/app.js', 900), a('gen/api.ts', 700)], ['gen/']);
  assert.deepEqual(r.fallas, []);
  assert.deepEqual(r.lineas, { contadas: 50, ignoradas: 6600 });
});
test('generados: carpeta, extensión y nombre exacto', () => {
  const generados = ['dist/a.js', 'web/dist/x.css', 'web/marca/logo.svg', 'a/yarn.lock'];
  for (const f of generados) assert.ok(esGenerado(f));
  for (const f of ['src/distancia.js', 'src/lock.js', 'scripts/build/a.js']) assert.ok(!esGenerado(f));
});
test('tarea completa pasa', () => assert.deepEqual(revisarTarea(TAREA), []));
test('tarea: campo que falta, vacío o fuera de lista se rechaza', () => {
  hay(revisarTarea(TAREA.replace('### Riesgos\n\nNinguno.\n', '')), /Falta el campo «Riesgos»/);
  hay(revisarTarea(TAREA.replace('Juan', '_No response_')), /«Para quién» está vacío/);
  hay(revisarTarea(TAREA.replace('Codex', 'Gemini')), /Claude o Codex/);
  hay(revisarTarea(TAREA.replace('Fase 1', 'Fase 9')), /«Fase» debe ser/);
  hay(revisarTarea(TAREA.replace('180', '900')), /de 1 a 400/);
  hay(revisarTarea(TAREA.replace('180', 'mucho')), /de 1 a 400/);
  hay(revisarTarea(''), /Falta el campo «Qué»/);
});
test('los campos que exige el revisor son los del formulario de tareas', () => {
  const yml = leer('.github/ISSUE_TEMPLATE/tarea.yml');
  const etiquetas = [...yml.matchAll(/^ {6}label: (.+)$/gm)].map((m) => m[1]);
  assert.deepEqual(etiquetas, CAMPOS_TAREA);
});
test('código nuevo: líneas de más de 100 y archivos nuevos de más de 300 se rechazan', () => {
  const linea = (n) => `+${'x'.repeat(n)}`;
  const a = (filename, patch, status = 'modified') => ({ filename, patch, status });
  const viejas = [' ' + 'y'.repeat(150), '-' + 'z'.repeat(150)];
  assert.deepEqual(revisarLimites([a('src/a.js', [linea(100), ...viejas].join('\n'))]), []);
  hay(revisarLimites([a('src/a.js', linea(101))]), /src\/a.js: 1 líneas nuevas de más de 100/);
  assert.deepEqual(revisarLimites([a('docs/a.md', linea(300)), a('dist/a.js', linea(300))]), []);
  assert.deepEqual(revisarLimites([a('src/a.js', `+// ${'https://x.com/'.repeat(9)}`)]), []);
  const nuevo = (n) => Array.from({ length: n }, (_, i) => `+const v${i} = ${i};`)
    .concat(['+', '+// nota']).join('\n');
  assert.deepEqual(revisarLimites([a('src/b.js', nuevo(300), 'added')]), []);
  hay(revisarLimites([a('src/b.js', nuevo(301), 'added')]), /301 líneas \(máximo 300\)/);
  assert.deepEqual(revisarLimites([a('src/b.js', nuevo(301))]), []);
});
test('casos de la revisión: «Closes:», siglas, «##» en la salida, tamaño con coma y bots', () => {
  assert.deepEqual(revisarCuerpo(CUERPO.replace('Closes #12', 'Closes: #12')), []);
  assert.deepEqual(revisarTitulo('feat(math): add sin helpers for la timezone'), []);
  const salida = CUERPO.replace('después: 140/140 bien', '## Summary\n140/140 bien');
  assert.deepEqual(revisarCuerpo(salida), []);
  hay(revisarTarea(TAREA.replace('180', '1,200')), /de 1 a 400/);
  assert.ok(exento({ user: { login: 'dependabot[bot]' } }));
  assert.ok(!exento({ user: { login: 'telivia-claude-codex[bot]' } }) && !exento(undefined));
});
