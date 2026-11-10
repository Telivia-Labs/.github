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

- **Sin PR (orden de Juan, 10 nov 2026).** Juan trabaja solo con Cerebro en sesión: el código y
  todo lo demás se sube directo a main. Antes de cada subida Cerebro corre las pruebas básicas
  (lint, tipos y lógica); si pasan, sube; si no, arregla y vuelve a probar. Main de telivia-app
  solo publica el ambiente de prueba. Las reglas de la rama solo impiden borrarla y forzarla.
- Cambios chicos y de un solo propósito por commit, para poder revertir uno sin tocar los demás.
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
    dependencias y tamaño.
- En el rediseño de Lumens ya no se crean tarjetas nuevas: se trabaja en sesión (sección 8).
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
- **La marca del panel es Telivia** (orden de Juan, 10 nov 2026), como QuickBooks, Xero o Stripe:
  - el logo de Telivia va arriba a la izquierda en todo el panel, computadora y celular;
  - la empresa cliente se ve como ícono cuadrado pequeño y su nombre en el selector de empresa;
  - el logo del cliente (horizontal) y su color van en lo que reciben sus clientes: facturas, PDF,
    cotizaciones, correos, recibos, portal y página de pago; abajo, en chiquito, la firma de
    Telivia: «Powered by» y el logo pequeño de Telivia, igual en español y en inglés;
  - al cliente se le piden dos archivos: logo cuadrado y logo horizontal;
  - los colores del cliente no cambian el panel: el panel usa las 4 paletas del R29.
  - **LIVIA** (orden de Juan, 10 nov 2026): su logo es el de Telivia sin la T y la E, con las
    mismas formas oficiales. En grande va el logo; el nombre «LIVIA» en texto solo dentro de
    frases y textos pequeños. Familia de marcas: Intelivia, Telivia, Livia y Vía.
- El área Agents se llama **LIVIA**: una sola asistente con funciones, vendida como paquete aparte
  de Telivia, con la declaración de impuestos entre sus funciones.
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

## 8. Trabajo en sesión (orden de Juan, 10 nov 2026)

- Cerebro coordina desde la sesión: reparte el trabajo entre sus ayudantes, revisa cada entrega
  contra la ficha y las reglas de diseño, resuelve los choques y sube a main. Sin PR, sin cola
  de unión y sin tarjetas nuevas en el tablero: la lista de pantallas pendientes la lleva Cerebro.
- Cada ayudante trabaja en su propia copia y solo toca la pantalla o pieza que le tocó.
- La base tiene un solo dueño a la vez: colores, letras, tamaños y piezas repetidas (botón,
  tarjeta, barra, tabla, formato de dinero) se cambian primero; las pantallas siguen después.
- Nadie inventa diseño: todo sale del prototipo aprobado y de los valores oficiales guardados.
  Si un valor no está ahí, no se crea en la pantalla. Lo que hace hoy Lumens se conserva.
- Antes de escribir, el ayudante lee las skills `telivia-diseno` y `marca-telivia` del repo.
- Pruebas, y Juan decide cuándo:
  - básicas (lint, tipos y lógica): siempre, antes de cada subida;
  - vistazo de pantalla (capturas en las 4 paletas, día y noche, computadora y celular): cuando
    Juan quiera ver una;
  - grandes (pantallas completas, estilos y calidad sobre main): cuando Juan lo pida, por
    ejemplo al terminar cada área.
