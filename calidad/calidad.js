// Prueba «calidad»: reemplaza a SonarCloud (decisión de Juan, 8 nov 2026) con las reglas
// gratuitas de SonarSource para JavaScript y TypeScript, más funciones de hasta 50 líneas.
// Corre en GitHub Actions y solo cuenta lo que cae en líneas nuevas del PR.
// Nunca lee la configuración del repo.
import { ESLint } from 'eslint';
import sonarjs from 'eslint-plugin-sonarjs';
import tseslint from 'typescript-eslint';
import { join } from 'node:path';
import { lineasNuevas, tocaNuevas } from './diff.js';

const CARPETA_GENERADA =
  /(?:^|\/)(?:dist|build|vendor|node_modules|\.next|__snapshots__|generad[oa]s?)\//i;
const MINIFICADO = /\.min\.(?:js|css)$/i;
const esGenerado = (ruta) => CARPETA_GENERADA.test(ruta) || MINIFICADO.test(ruta);

/** ¿Es código de terceros copiado tal cual? «dir/», «*.ext» o el nombre exacto (como forma). */
export function esDeTerceros(ruta, terceros = []) {
  return terceros.some((p) => {
    if (p.endsWith('/')) return ruta.startsWith(p);
    if (p.startsWith('*.')) return ruta.endsWith(p.slice(1));
    return ruta === p;
  });
}

const JS = /\.(m?js|cjs|jsx)$/;
const TS = /\.(m?ts|cts|tsx)$/;
const SOPORTADO = (r, terceros) =>
  (JS.test(r) || TS.test(r)) && !esGenerado(r) && !esDeTerceros(r, terceros);

export function configuracion() {
  const comun = { ecmaVersion: 'latest', sourceType: 'module' };
  return [
    {
      files: ['**/*.{js,mjs,cjs,jsx}'],
      languageOptions: { ...comun, parserOptions: { ecmaFeatures: { jsx: true } } },
    },
    { files: ['**/*.{ts,mts,cts,tsx}'], languageOptions: { ...comun, parser: tseslint.parser } },
    sonarjs.configs.recommended,
    {
      rules: {
        'max-lines-per-function': ['error', { max: 50, skipBlankLines: true, skipComments: true }],
        // SonarCloud solo informa los TODO y FIXME; no frenan un PR
        'sonarjs/todo-tag': 'off',
        'sonarjs/fixme-tag': 'off',
      },
    },
  ];
}

/** Mensajes de error que tocan líneas nuevas. resultados: los de ESLint; nuevasDe(ruta) → Map. */
export function soloNuevas(resultados, nuevasDe, base) {
  const fallas = [];
  for (const r of resultados) {
    const ruta = r.filePath.slice(base.length + 1);
    const nuevas = nuevasDe(ruta);
    for (const m of r.messages) {
      if (m.fatal) {
        fallas.push(`${ruta}:${m.line}: no se pudo leer (${m.message})`);
        continue;
      }
      if (m.severity < 2 || !tocaNuevas(nuevas, m.line, m.endLine || m.line)) continue;
      fallas.push(`${ruta}:${m.line}: ${m.message} [${m.ruleId}]`);
    }
  }
  return fallas;
}

/** Revisa los archivos JS/TS del PR ya descargado en dir. Devuelve { fallas, revisados }.
 * terceros: rutas de código ajeno copiado tal cual (p. ej. piezas de shadcn) que no se revisan. */
export async function revisarCalidad(dir, archivos, terceros = []) {
  const lista = archivos.filter((a) => a.status !== 'removed' && SOPORTADO(a.filename, terceros));
  if (!lista.length) return { fallas: [], revisados: 0 };
  const patches = new Map(lista.map((a) => [a.filename, lineasNuevas(a.patch)]));
  const eslint = new ESLint({
    cwd: dir,
    overrideConfigFile: true,
    overrideConfig: configuracion(),
    errorOnUnmatchedPattern: false,
  });
  const resultados = await eslint.lintFiles(lista.map((a) => join(dir, a.filename)));
  const nuevasDe = (r) => patches.get(r) || new Map();
  return { fallas: soloNuevas(resultados, nuevasDe, dir), revisados: lista.length };
}
