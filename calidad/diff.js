// Líneas agregadas de un archivo a partir del «patch» que da GitHub: número de línea → texto.
// Solo lo nuevo se revisa (como el «código nuevo» de SonarCloud); lo heredado no frena un PR.

export function lineasNuevas(patch = '') {
  const nuevas = new Map();
  let n = 0;
  for (const l of patch.split('\n')) {
    const h = /^@@ -\d+(?:,\d+)? \+(\d+)/.exec(l);
    if (h) n = Number(h[1]);
    else if (l.startsWith('+')) nuevas.set(n++, l.slice(1));
    else if (!l.startsWith('-') && !l.startsWith('\\')) n += 1;
  }
  return nuevas;
}

/** ¿Algún número entre desde y hasta (incluidos) es una línea nueva? */
export function tocaNuevas(nuevas, desde, hasta = desde) {
  for (let i = desde; i <= hasta; i += 1) if (nuevas.has(i)) return true;
  return false;
}
