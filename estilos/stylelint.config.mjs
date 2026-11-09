// Escala de diseño R29 de Telivia para Stylelint (reglas de fábrica, sin complementos propios).
// La usa el flujo compartido estilos.yml. Solo se revisan las líneas nuevas o tocadas de cada PR.
//   letra:     13 14 16 18 20 24 28 32 40 px (48 56 64 solo en archivos de portada)
//   peso:      500 600 700 800
//   espacios:  0 4 8 12 16 20 24 32 48 px (margin, padding, gap)
//   radios:    8 12 14 16 20 24 28 px, pastilla 999px y círculo 50%
//   colores:   solo tokens var(--...); nunca hexadecimales escritos a mano
//   línea:     18 20 24 28 32 36 40 48 px (line-height: 1 para piezas de una sola línea)
//   controles: height y min-height de botones y campos en 44 48 52 56 px (alto-controles.mjs)
// Los estilos escritos dentro del JavaScript los sigue revisando «escala» en Lumens.
import altoControles from './alto-controles.mjs';

const PALABRAS = 'inherit|initial|unset|revert';
const TOKEN = 'var\\(--[\\w-]+(?:,[^()]*)?\\)';
// calc(), min(), max() o clamp() se aceptan solo si usan tokens.
const FUNCION = '(?:calc|min|max|clamp)\\((?=[^;]*var\\(--)[^;]*\\)';

const px = (lista) => lista.map((n) => (n === 0 ? '0' : `${n}px`)).join('|');
const uno = (valores) => `(?:${valores}|${TOKEN}|${FUNCION})`;
const exacto = (valores) => new RegExp(`^(?:${uno(valores)}|${PALABRAS})$`, 'i');
const varios = (valores, max) =>
  new RegExp(`^(?:${uno(valores)}(?:\\s+${uno(valores)}){0,${max - 1}}|${PALABRAS})$`, 'i');

const LETRA = px([13, 14, 16, 18, 20, 24, 28, 32, 40]);
const LETRA_PORTADA = px([13, 14, 16, 18, 20, 24, 28, 32, 40, 48, 56, 64]);
const PESO = '500|600|700|800';
// «1» no se puede limitar a piezas de una línea con una regla automática: se revisa a mano.
const LINEA = `${px([18, 20, 24, 28, 32, 36, 40, 48])}|1`;
const ESPACIO = px([0, 4, 8, 12, 16, 20, 24, 32, 48]);
const RADIO = `${px([0, 8, 12, 14, 16, 20, 24, 28])}|999px|50%`;

const LADOS = ['top', 'right', 'bottom', 'left', 'block', 'inline', 'block-start', 'block-end',
  'inline-start', 'inline-end'];
const ESQUINAS = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'start-start',
  'start-end', 'end-start', 'end-end'];
const COLORES = ['color', 'background-color', 'border-color', 'border-top-color',
  'border-right-color', 'border-bottom-color', 'border-left-color', 'outline-color', 'fill',
  'stroke', 'caret-color', 'accent-color', 'text-decoration-color', 'column-rule-color'];

function escala(letra) {
  const lista = {
    'font-size': [exacto(letra)],
    'font-weight': [exacto(PESO)],
    'line-height': [exacto(LINEA)],
    margin: [varios(`${ESPACIO}|auto`, 4)],
    padding: [varios(ESPACIO, 4)],
    gap: [varios(ESPACIO, 2)],
    'row-gap': [exacto(ESPACIO)],
    'column-gap': [exacto(ESPACIO)],
    'border-radius': [varios(RADIO, 4)],
  };
  for (const lado of LADOS) {
    lista[`margin-${lado}`] = [varios(`${ESPACIO}|auto`, 2)];
    lista[`padding-${lado}`] = [varios(ESPACIO, 2)];
  }
  for (const esquina of ESQUINAS) lista[`border-${esquina}-radius`] = [exacto(RADIO)];
  const color = new RegExp(`^(?:${TOKEN}|transparent|currentcolor|none|${PALABRAS})$`, 'i');
  for (const propiedad of COLORES) lista[propiedad] = [color];
  return lista;
}

const reglas = (letra) => ({
  'telivia/alto-controles': true,
  'color-no-hex': [true, { message: 'Color escrito a mano: usar un token var(--...) del R29' }],
  'declaration-property-value-allowed-list': [
    escala(letra),
    { message: (propiedad, valor) => `«${propiedad}: ${valor}» está fuera de la escala R29` },
  ],
});

export default {
  plugins: [altoControles],
  rules: reglas(LETRA),
  overrides: [
    { files: ['**/*.html', '**/*.htm'], customSyntax: 'postcss-html' },
    { files: ['**/*portada*.{css,html}'], rules: reglas(LETRA_PORTADA) },
  ],
};
