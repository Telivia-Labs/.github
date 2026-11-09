// Complemento de Stylelint «telivia/alto-controles»: el alto (height, min-height) de botones y
// campos va en 44, 48, 52 o 56 px (R29). La regla de fábrica no distingue selectores; esta sí.
// Reconoce botones y campos como el revisor «escala» de Lumens: button, .btn, [role=button],
// input, select, textarea y las clases .campo, .field, .input. Tokens y otras unidades pasan.
import stylelint from 'stylelint';

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint;

export const ruleName = 'telivia/alto-controles';
export const ALTOS = [44, 48, 52, 56];
const PROPIEDADES = new Set(['height', 'min-height']);
const CONTROL = new RegExp(
  '(^|[\\s,>+~(])(button|input|select|textarea|\\.btn\\b|\\.boton\\b|\\.campo\\b|\\.field\\b|' +
    '\\.input\\b|\\[role=["\']?button)',
  'i',
);

export const messages = ruleMessages(ruleName, {
  rejected: (propiedad, valor) =>
    `«${propiedad}: ${valor}» en un botón o campo: usar 44, 48, 52 o 56 px (R29)`,
});

// Números en px fuera de calc/var con tokens. Devuelve los que no están en la escala.
export function fueraDeEscala(valor) {
  if (/var\(--/.test(valor)) return [];
  const numeros = [...valor.matchAll(/(-?\d*\.?\d+)px\b/g)].map((m) => Number(m[1]));
  return numeros.filter((n) => !ALTOS.includes(n));
}

const regla = (activa) => (root, result) => {
  if (!validateOptions(result, ruleName, { actual: activa }) || !activa) return;
  root.walkDecls((decl) => {
    if (!PROPIEDADES.has(decl.prop.toLowerCase())) return;
    const selector = decl.parent?.selector;
    if (!selector || !CONTROL.test(selector) || !fueraDeEscala(decl.value).length) return;
    report({
      ruleName,
      result,
      node: decl,
      message: messages.rejected(decl.prop, decl.value),
      word: decl.value,
    });
  });
};

regla.ruleName = ruleName;
regla.messages = messages;
regla.meta = { url: 'https://github.com/Telivia/.github/tree/main/estilos' };

export default createPlugin(ruleName, regla);
