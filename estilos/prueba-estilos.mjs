// Pruebas de la revisión «estilos»: escala R29 y filtro de líneas nuevas.
//   cd estilos && npm ci && npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import stylelint from 'stylelint';
import { lineasNuevas, archivosARevisar, filtrar } from './revisar-estilos.mjs';

const configFile = fileURLToPath(new URL('./stylelint.config.mjs', import.meta.url));

async function problemas(code, codeFilename = 'prueba.css') {
  const { results } = await stylelint.lint({ code, codeFilename, configFile });
  return results[0].warnings.map((w) => w.rule);
}

test('fuera de la escala sale en rojo', async () => {
  for (const malo of ['font-size: 15px', 'font-weight: 400', 'padding: 10px 16px', 'gap: 6px',
    'border-radius: 10px', 'margin: -8px', 'background-color: rgb(0 0 0)', 'line-height: 22px',
    'line-height: 1.5', 'line-height: normal']) {
    assert.ok((await problemas(`.x { ${malo}; }`)).length, malo);
  }
});

test('hexadecimal escrito a mano sale en rojo, en cualquier propiedad', async () => {
  assert.ok((await problemas('.x { color: #fff; }')).includes('color-no-hex'));
  assert.ok((await problemas('.x { box-shadow: 0 0 1px #000; }')).includes('color-no-hex'));
});

test('la escala R29 y los tokens pasan', async () => {
  const bien = ['font-size: 13px', 'font-size: 40px', 'font-weight: 800', 'padding: 0 4px 8px 48px',
    'margin: 0 auto', 'gap: 12px 16px', 'border-radius: 999px', 'border-radius: 50%',
    'border-radius: 28px', 'color: var(--ink)', 'fill: currentColor', 'font-size: var(--text-body)',
    'padding: calc(var(--space-card) * 2)', 'background-color: transparent', 'line-height: 24px',
    'line-height: 36px', 'line-height: 1', 'line-height: var(--line-body)'];
  for (const valor of bien) assert.deepEqual(await problemas(`.x { ${valor}; }`), [], valor);
});

test('48, 56 y 64 px solo en archivos de portada', async () => {
  assert.ok((await problemas('.h { font-size: 56px; }', 'web/inicio.css')).length);
  assert.deepEqual(await problemas('.h { font-size: 56px; }', 'web/inicio-portada.css'), []);
});

test('revisa el CSS dentro del HTML', async () => {
  const html = '<style>.x { font-size: 15px; }</style><p style="padding: 10px">a</p>';
  assert.equal((await problemas(html, 'pagina.html')).length, 2);
});

test('solo cuenta las líneas nuevas o tocadas del diff', () => {
  const diff = ['+++ b/a.css', '@@ -2,0 +3,2 @@', '+.x{}', '+.y{}', '+++ b/borrado.css',
    '@@ -1 +0,0 @@', '+++ b/vendor/x.css', '@@ -1 +1 @@', '+++ b/app.js', '@@ -1 +1 @@'].join('\n');
  const mapa = lineasNuevas(diff);
  assert.deepEqual([...mapa['a.css']], [3, 4]);
  assert.deepEqual(archivosARevisar(mapa), ['a.css']);
  const resultados = [{ source: '/repo/a.css', warnings: [{ line: 1 }, { line: 4 }] }];
  assert.deepEqual(filtrar(resultados, mapa, '/repo').map((p) => p.line), [4]);
});

test('alto de botones y campos: 44, 48, 52 o 56 px', async () => {
  const regla = 'telivia/alto-controles';
  for (const malo of ['button { height: 40px; }', '.btn-x .btn { min-height: 36px; }',
    'input[type=text] { height: 42px; }', '.campo { min-height: 50px; }']) {
    assert.ok((await problemas(malo)).includes(regla), malo);
  }
  for (const bien of ['button { height: 44px; }', '.btn { min-height: 56px; }',
    'select { height: var(--alto-campo); }', '.tarjeta { height: 120px; }',
    'textarea { min-height: 52px; }', '.campo { height: 100%; }']) {
    assert.deepEqual(await problemas(bien), [], bien);
  }
});
