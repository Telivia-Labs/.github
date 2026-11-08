import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { revisarCalidad } from './calidad.js';

const MALO = [
  'export function f(a) {',
  '  if (a) { return 1; } else { return 1; }',
  '}',
  '',
].join('\n');

const cuerpo = Array.from({ length: 52 }, (_, i) => `  const v${i} = ${i};`);
const LARGA = ['export function g() {', ...cuerpo, '  return 0;', '}', ''].join('\n');

function repo(archivos) {
  const dir = mkdtempSync(join(tmpdir(), 'revisor-'));
  for (const [r, t] of Object.entries(archivos)) {
    mkdirSync(join(dir, r, '..'), { recursive: true });
    writeFileSync(join(dir, r), t);
  }
  return dir;
}
const todoNuevo = (texto) => `@@ -0,0 +1,${texto.split('\n').length} @@\n`
  + texto.split('\n').map((l) => `+${l}`).join('\n');

test('calidad: encuentra ramas idénticas (regla de SonarSource)', async () => {
  const dir = repo({ 'src/a.js': MALO });
  const a = [{ filename: 'src/a.js', status: 'added', patch: todoNuevo(MALO) }];
  const r = await revisarCalidad(dir, a);
  assert.equal(r.revisados, 1);
  assert.ok(r.fallas.some((f) => /sonarjs\//.test(f)), r.fallas.join('\n'));
});

test('calidad: lo heredado fuera de las líneas nuevas no frena el PR', async () => {
  const dir = repo({ 'src/a.js': `${MALO}export const z = 1;\n` });
  const patch = '@@ -3,2 +3,3 @@\n }\n \n+export const z = 1;';
  const r = await revisarCalidad(dir, [{ filename: 'src/a.js', status: 'modified', patch }]);
  assert.deepEqual(r.fallas, []);
});

test('calidad: función de más de 50 líneas falla', async () => {
  const dir = repo({ 'g.js': LARGA });
  const a = [{ filename: 'g.js', status: 'added', patch: todoNuevo(LARGA) }];
  const r = await revisarCalidad(dir, a);
  assert.ok(r.fallas.some((f) => /max-lines-per-function/.test(f)), r.fallas.join('\n'));
});

test('calidad: TypeScript se lee; sin archivos JS/TS no revisa nada', async () => {
  const ts = 'export const n: number = 1;\n';
  const dir = repo({ 'a.ts': ts });
  const a = [{ filename: 'a.ts', status: 'added', patch: todoNuevo(ts) }];
  const r = await revisarCalidad(dir, a);
  assert.deepEqual(r.fallas, []);
  const swift = await revisarCalidad(dir, [{ filename: 'a.swift', status: 'added' }]);
  assert.equal(swift.revisados, 0);
});
