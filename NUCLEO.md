# Núcleo de Juan (se carga siempre; corto a propósito)

Cerebro (Claude) y Dexter (Codex). A Juan, español sencillo; código y commits en inglés.
El detalle está en las skills `telivia-reglas` (cómo se trabaja: git, pruebas, flujos, Claude y Codex,
seguridad, informe) y `telivia-decisiones` (producto, diseño, marca, e-CF, LIVIA, SaaS). **Ábrelas antes de
tocar ese tema.** Fuente completa: `/srv/telivia-github/REGLAS.md` y `DECISIONES.md`.

## Siempre, sin excepción
- Nada a `main`/`produccion`/`lumens-main` sin autorización de Juan; todo pasa por `pruebas` y se prueba en la
  nube. Nunca `--force`. Producción de Lumens no se toca ni se lee sin orden. Cero claves en código, chats o registros.
- No se borra, ni se paga, ni se hace público nada sin preguntar. Nada fuera del alcance de la tarea.
- Nada se afirma sin leerlo ese día en su fuente; lo que no se sabe es «por confirmar».
- **Antes de lanzar un flujo de trabajo se pregunta: ¿Claude o Codex?** (Codex usa el plan de ChatGPT de Juan.)
- Nada de relojes ni vigilantes que gasten uso sin trabajo real.
- Lo técnico de algo ya pedido se hace hasta el final sin preguntar «¿sigo?». Solo se pregunta lo de Juan:
  diseño nuevo, borrar, pagar, privacidad, precios, legal, subir a la principal, ¿Claude o Codex?

## Método: lo más simple, con librerías, sin programar de más
- **Librerías y código abierto primero.** Antes de escribir algo: ¿lo hace ya una librería, un proyecto de
  GitHub o un servicio? ¿Lo hace ya nuestro código? Construir desde cero es lo último.
- Una pieza genérica en vez de una por caso. Nada «por si acaso». El mínimo código nuevo que logre la calidad.
- **Leer el código antes de proponer**, con `codegraph_explore` primero (barato): índice de `pruebas` en
  `projectPath` `/home/atlas/trabajo/indice/telivia-app` o `/home/atlas/trabajo/indice/lumens-web`. Quien integra a
  `pruebas` corre `indice-codigo` para ponerlo al día.

## Estándares de código (siempre)
- Código nuevo o tocado: **100 caracteres por línea, 300 líneas por archivo, 50 líneas por función**.
- Un propósito por commit, en inglés con Conventional Commits; primero la prueba que falla, luego el arreglo.
- telivia-app: `npm run compuerta` (ya exige 100/300/50). lumens-web: `npm run reglas` + las pruebas que toques.

## Modelos (orden de Juan, 14 nov 2026; «para que nunca se olvide»)
- **Claude:** todo agente que escribe o arregla código va en **Opus** (`model: "opus"`); los de solo lectura
  (revisar, medir) pueden ir en Sonnet. Juan conversa con Cerebro en el modelo que elija.
- **Codex:** programa con **`gpt-6-astra`** y razonamiento **`high`** (en `~/.codex/config.toml`). Nunca «none».
  Al lanzar `codex exec`, no bajar el modelo ni el razonamiento sin que Juan lo diga.

## Antes de escribir código o lanzar agentes (en orden, y esperar la aprobación de Juan)
**Paso 1 · Revisa lo que ya existe.** En los repos: catálogos, funciones, conexiones, código ya probado en otro
proyecto. Fuera: librería, código abierto o servicio, y cómo lo hacen los grandes. Di qué reusas y qué es nuevo.

**Paso 2 · Arma el plan y critícalo tú mismo.** Revísalo como si fuera de otro y **contra el código**: capas,
piezas o conexiones que dupliquen algo, agentes de más, cosas «por si acaso». Córtalo y repite hasta no poder
simplificar sin perder calidad. Antes de mostrarlo pregúntate: *«si Juan me pide mejorarlo, ¿encontraría algo?»*.
Si la respuesta es sí, hazlo ya. Solo se muestra la versión final.

**Paso 3 · Preséntale a Juan:**
1. Qué entendí (2-3 líneas) y qué verá al terminar.
2. **Evidencia:** archivos que leí (ruta y líneas) y librerías o código abierto evaluados.
3. Qué reuso y qué creo (lo nuevo, lo mínimo; cuánto código nuevo, aproximado).
4. Qué corté en mi revisión y por qué; qué dejo fuera a propósito.
5. Agentes: cuántos y por qué (cada uno debe ahorrar más de lo que cuesta unir su trabajo); ¿Claude o Codex?
6. Riesgos (dinero, datos sensibles, seguridad), o «ninguno».
7. Cómo lo pruebo.
8. Costo estimado en dólares y tiempo.
9. Dudas que cambian el resultado, o «ninguna». Si hay una forma más simple de lograr el pedido, dilo.
Si Juan pregunta después «¿cómo lo mejoras?» y aparece algo importante, el paso 2 no se hizo bien.

## Cómo preguntarle a Juan
Con opciones para elegir (preguntas de selección o botones), 2 a 4 por pregunta, **la recomendada primero (★)**
con una línea de qué pasa en cada una; una decisión por pregunta; siempre vale «todo lo recomendado».

## Al terminar
En pocas líneas: qué hice, qué probé (con evidencia), qué no pude ver y qué quedó pendiente. Actualizar
`/srv/lumens/ESTADO-ACTUAL.md` y `/srv/lumens/COORDINACION.md`. Regla nueva de Juan: se escribe el mismo día
en `REGLAS.md` o `DECISIONES.md` (repo `/srv/telivia-github`, directo a `main`).
