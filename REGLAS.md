# Reglas de Juan para Cerebro (Claude) y Dexter (Codex)

Fuente única de las reglas de trabajo de Telivia, Lumens y LIVIA. Se lee **antes de cada tarea**.
Si choca con otro documento, manda esta, salvo una orden escrita de Juan más nueva. Cuando Juan da
una regla nueva o corrige algo, se escribe aquí el mismo día, sin esperar a que lo pida.

## 1. Cómo hablarle a Juan

- Todo lo que Juan lee va en **español sencillo**: mensajes, resúmenes y textos de tareas. Código y
  commits van en inglés.
- No preguntar «¿sigo?» ni pedir permiso para pasos técnicos de algo que ya pidió. Se sigue hasta
  terminar y se reporta.
- Solo se le pregunta por:
  - diseño nuevo sin prototipo aprobado;
  - borrar cosas;
  - pagar (se le prepara todo con el total);
  - privacidad (hacer público algo, datos de clientes);
  - precios, textos legales, topes y plazos de negocio.
- Lo legal (licencias y DGII) ya está confirmado con el abogado. No se vuelve a plantear.
- Si Juan tiene que hacer algo a mano, primero se busca otra forma de hacerlo sin él.

## 2. Antes de afirmar algo

- Todo dato se lee **ese mismo día en su fuente** antes de afirmarlo. No se escribe de memoria.
  - Proveedor de e-CF: **MSeller**, conectado en lumens-web (`sis/ecf/`, `api/sis/_ecf.js`).
  - Diseño: `docs/diseno/r29/` y `docs/diseno/elecciones-de-juan.md` de telivia-app.
  - Plan vigente: `docs/plan-arranque-telivia.md` de telivia-app.
  - Revisiones exigidas: los rulesets de cada repo, leídos por la API.
- Antes de decir que algo funciona o protege, comprobarlo en cada repo y avisar de cada hueco.
- Si un dato no se sabe, se escribe «por confirmar». Nunca se inventa.

## 3. GitHub y entregas

- **Lo que se puede hacer sin PR se hace directo**: documentos, planes, tableros, tareas, ajustes.
  Es mucho más rápido. La única espera es si la cola de unión del repo tiene PR esperando: subir
  directo la vacía, así que se espera a que quede libre.
- El código va por PR de máximo 400 líneas, que se une solo con las revisiones exigidas en verde.
- Nunca forzar una subida (`--force`).
- Firma de git en la configuración de cada copia. El correo de Juan nunca va dentro de comandos.

## 4. Tareas del tablero

- **Solo tareas de desarrollo.** Nada de investigar, informes, análisis, decisiones, «mes real»,
  abogado, costos de proveedores ni cosas personales de Juan.
- Las decisiones se le preguntan a Juan en el chat; no se convierten en tareas.
- Lo que sobra se **borra**, no se cierra. Si la app no puede borrar, se cierra y se saca del
  tablero para que Juan no lo vea.
- Cada tarea lleva:
  - título en inglés con Conventional Commits, una sola cosa y sin «y»;
  - qué hacer, carpeta o archivos a tocar, criterios que se puedan comprobar con una prueba,
    dependencias y tamaño (cabe en una PR de ≤ 400 líneas).
- Formularios en este repo (`Telivia/.github`). Las pantallas usan el formulario de pantalla.
- Límites del código nuevo o tocado: 100 caracteres por línea, 300 por archivo y 50 por función.

## 5. Diseño

- **Todo sale de librería.** Nada dibujado a mano.
  - Permitidas: shadcn, Magic UI, Kibo UI, Aceternity UI, Animate UI, React Bits, Cult UI,
    Motion Primitives, AI Elements y assistant-ui.
  - Prohibida: coss ui (Origin UI), porque es AGPL.
- Medidas, espacios, letra y piezas: **shadcn tal cual**. El manual R29 pone solo la marca:
  - las 4 paletas (verde, turquesa, azul y grafito), de día y de noche;
  - los colores por área, las fuentes (Archivo, Manrope y Space Grotesk), el Dock y LIVIA.
- Toda pantalla se revisa en las 4 paletas, de día y de noche, en computadora y celular.
- Tarjetas **sin borde fino**: separa la sombra, el aire y la altura.
- Panel en computadora: sin menú lateral. Dock de 10 áreas abajo, sin crecer al pasar el cursor.
- Panel en celular: barra en píldora con LIVIA al centro (su cara en círculo, sin texto) y el «+»
  arriba.
- **Logos oficiales en SVG**, nunca escritos como texto. Cambian de color con el tema.
  - Lumens no lleva nada debajo del logo.
  - Las empresas clientes llevan «Con la tecnología de Telivia».
- LIVIA es el personaje del R29. Su traje cambia con la paleta y las 4 imágenes van en el mismo marco.
- El dinero nunca cuenta ni rueda en pantalla. Contraste mínimo 4.5:1.

## 6. Licencias y producto

- Dentro del producto: MIT, Apache, BSD o LGPL.
  - AGPL solo como servicio aparte sin modificar, o en módulos de Odoo publicados con AGPL.
- Prohibido dentro del producto: n8n, Odoo Enterprise, TEN Framework y WhatsApp no oficial.
- Herramientas internas que no se reparten pueden ser GPL o AGPL.
- Telivia no emite e-CF: le manda los datos a MSeller por API.
- Producción de Lumens no se toca sin orden de Juan. Las pruebas usan datos de ejemplo y ambientes
  de prueba.
- Cero claves en código, chats o registros.

## 7. Gasto

- Nada que gaste uso sin trabajo real: sin relojes, vigilantes ni reintentos periódicos. El modo
  automático lo despierta GitHub por eventos.
- No instalar revisores ni procesos que consuman créditos sin que Juan lo pida.
- No instalar bloqueos ni ganchos que Juan no haya pedido.

## 8. Trabajo en paralelo (orden de Juan, 10 nov 2026)

- Una tarjeta = un agente = una rama = una PR. Nunca dos tarjetas en una rama ni PR encadenadas.
  Si no cabe en una PR de ≤ 400 líneas, la tarjeta se parte; no se trabaja a medias.
- Cada tarjeta dice qué pantallas y piezas toca y cuáles no. Solo se toca lo escrito.
- La base tiene un solo dueño a la vez: colores, letras, tamaños y piezas repetidas (botón,
  tarjeta, barra) se cambian en una sola tarjeta, que se une primero. Las pantallas arrancan
  después, desde la base nueva.
- Nadie inventa diseño: todo sale del prototipo aprobado y de los valores oficiales guardados.
  Si un valor no está ahí, no se crea en la pantalla.
- Todos parten de main actualizado. Paquetes chicos que se unen el mismo día.
- Se une de uno en uno por la cola de unión: cada PR se vuelve a probar junto con main y con las
  que van delante. Si no encaja, sale de la fila sin frenar a las demás.
- Pocas tarjetas abiertas a la vez: terminar vale más que empezar.
- La foto manda al final: cada pantalla se compara foto contra foto con el prototipo antes de unir.
