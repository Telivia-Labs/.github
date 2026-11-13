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
- Lo legal (licencias y DGII) lo decide Juan: el abogado es él. No se le menciona «el abogado»
  ni se le manda a consultar a otro; si hay una duda legal, se le explica y él decide.
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

- **Nada directo a la rama principal sin autorización de Juan** (orden de Juan, 12 nov 2026; reemplaza
  la regla «sin PR» del 10 nov). Todo cambio se sube primero al **entorno de prueba** (telivia-app y
  lumens-web), se prueba ahí de verdad (pantallas, llamadas y datos) y solo después de que Juan lo
  autorice se sube a la principal (`main` / `produccion` / `lumens-main`). Antes de cada subida se corren
  las pruebas básicas (lint, tipos y lógica). Esto incluye los cambios chicos, los arreglos urgentes y
  los agentes de ElevenLabs (se prueban en una copia antes de tocar el real). Si algo ya publicado falla,
  se devuelve a la versión anterior sin esperar y se le avisa a Juan.
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

> **Atención (13 nov 2026):** donde esta sección 5 choque con el bloque «Nueva línea gráfica» (más abajo),
> con `EFECTOS.md` o con el manual vivo `DESIGN.md` (telivia-app, rama `diseno/v2`), mandan esos tres.
> Las líneas ya reemplazadas llevan la marca [REEMPLAZADO].

- **Todo sale de librería.** Nada dibujado a mano.
  - Permitidas: shadcn, Magic UI, Kibo UI, Aceternity UI, Animate UI, React Bits, Cult UI,
    Motion Primitives, AI Elements y assistant-ui.
  - Prohibida: coss ui (Origin UI), porque es AGPL.
- [REEMPLAZADO el 13 nov 2026 por el bloque «Nueva línea gráfica» y el manual vivo `DESIGN.md`] Medidas, espacios, letra y piezas: **shadcn tal cual**. El manual R29 pone solo la marca:
  - las 4 paletas (verde, turquesa, azul y grafito), de día y de noche;
  - las fuentes (Archivo, Manrope y Space Grotesk), el Dock y LIVIA.
  - Ya no hay colores por área (orden de Juan, 11 nov 2026): todas las suites usan el color de la
    paleta que elige el cliente, de día y de noche, también el mapa y los íconos.
- Toda pantalla se revisa en grafito, de día y de noche, en computadora (1280, 1440 y pantallas grandes) y celular. [Antes: 4 paletas]
- Tarjetas **sin borde fino**: separa la sombra, el aire y la altura.
- [REEMPLAZADO 13 nov 2026] Panel en computadora: barra lateral con etiquetas, colapsable, sin barra superior y sin Dock (por confirmar con Juan; antes: Dock de 10 áreas abajo).
- [AJUSTADO 13 nov 2026: LIVIA sin cara; su imagen es el halo] Panel en celular: barra en píldora con LIVIA al centro y el «+»
  arriba.
- **Logos oficiales en SVG**, nunca escritos como texto. Cambian de color con el tema.
- **La marca del panel es Telivia** (orden de Juan, 10 nov 2026), como QuickBooks, Xero o Stripe:
  - el logo de Telivia va arriba a la izquierda en todo el panel, computadora y celular;
  - la empresa cliente se ve como ícono cuadrado pequeño y su nombre en el selector de empresa;
  - el logo del cliente (horizontal) y su color van en lo que reciben sus clientes: facturas, PDF,
    cotizaciones, correos, recibos, portal y página de pago; abajo, en chiquito, la firma de
    Telivia: «Powered by» y el logo pequeño de Telivia, igual en español y en inglés;
    excepto en documentos formales que la empresa envía a su cliente (factura, nota de crédito,
    recibo): ahí no va «Powered by» (orden de Juan, 11 nov 2026);
  - al cliente se le piden dos archivos: logo cuadrado y logo horizontal;
  - los colores del cliente no cambian el panel: el panel usa las 4 paletas del R29.
  - **LIVIA** (orden de Juan, 10 nov 2026): su logo es el de Telivia sin la T y la E, con las
    mismas formas oficiales. En grande va el logo; el nombre «LIVIA» en texto solo dentro de
    frases y textos pequeños. Familia de marcas: Intelivia, Telivia, Livia y Vía.
- El área Agents se llama **LIVIA**: una sola asistente con funciones, vendida como paquete aparte
  de Telivia, con la declaración de impuestos entre sus funciones.
- **LIVIA habla en primera persona** (orden de Juan, 11 nov 2026): en su chat, voz y textos le habla
  directo a la persona («¿En qué te ayudo?»), nunca en tercera («Pregúntale a LIVIA»). Chat vacío:
  sin frase de relleno; sugerencias de un toque arriba de la caja.
- [REEMPLAZADO 13 nov 2026: sin personaje, sin traje; LIVIA es nombre, voz y halo] LIVIA era el personaje del R29.
- El dinero nunca cuenta ni rueda en pantalla. Contraste mínimo 4.5:1.
- Se dice **«Cuentas por cobrar»** y **«Cuentas por pagar»** (orden de Juan, 10 nov 2026); nunca «Por cobrar»
  ni «Por pagar» solos.
- [REEMPLAZADO 13 nov 2026 por la línea grafito sobria; los efectos válidos son los de `EFECTOS.md`] **Dirección «Vibrante» para todo el panel** (orden de Juan, 11 nov 2026). Se permitían:
  - fondos de color de la paleta con movimiento suave, que se detienen a los 5 s y quedan quietos
    con «reducir movimiento»;
  - LIVIA y su resumen del día en la cabecera de Inicio;
  - cifras con degradado y celebraciones sobrias (una ráfaga corta).
  - La tarjeta de arriba de Inicio va en color intenso de la paleta; la tarjeta de adentro, clara.
    Un solo estilo de tarjeta en todo el panel.
- Fuera de eso, efectos solo los que responden a algo que hace la persona (juego oficial de
  `docs/diseno/elecciones-de-juan.md`).
- [VIGENTE salvo los botones con relieve, reemplazados por el manual v1.2] Estilo elegido por Juan (11 nov 2026): pestañas con raya que se desliza, tablas con fondo alterno
  (tipo Stripe), botones con relieve (sombra en vez de borde) y campos con etiqueta flotante y raya
  de color al enfocar.

- **Método de trabajo: primero se muestra y se elige, después se construye** (orden de Juan, 13 nov 2026,
  «para que nunca se te olvide»; evita el trabajo doble). Para toda decisión de diseño, de producto o
  de marca que todavía no está cerrada:
  1. Se prepara una página publicada (enlace privado) con **2 o 3 opciones lado a lado**, con datos de
     ejemplo reales, día y noche, escritorio y celular, y una **recomendación ★ con su razón en una línea**.
  2. Se le manda a Juan **todo junto**: una hoja con los enlaces, la recomendación de cada tema y lo que
     falta por decidir. Juan elige una sola vez («todo lo recomendado» y solo nombra lo que cambia).
  3. Lo elegido se escribe el mismo día en el manual (`DESIGN.md`), los tokens y la guía de los agentes.
  4. **Solo entonces se implementa en el código real**, y siempre en una rama o entorno de prueba.
  Antes de pedirle algo a Juan, se revisan sus artifacts y archivos anteriores (ya hizo prototipos de
  casi todo). Las opciones deben ser distintas entre sí, no microajustes. Cada página se revisa con
  captura antes de enviarla y se comprueba que abra (raíz correcta, sin pantalla negra).

- **Nueva línea gráfica: grafito y un solo producto, Telivia** (órdenes de Juan, 13 nov 2026; reemplazan lo
  anterior donde choquen):
  - Un solo color de marca: **grafito**, con modo día y modo noche. Ya no hay 4 paletas ni color
    elegible. La noche tiene capas y profundidad: ni plana ni negra pura (niveles de superficie
    del manual de diseño).
  - Sin barra superior y **sin personaje** (sin cara ni traje). El software se llama **Telivia**
    y la asistente sigue llamándose **LIVIA** (orden de Juan, 13 nov 2026: «tiene nombre de mujer
    y voz y pega»): conserva su nombre y su voz Adriana, y su imagen es el halo de voz. Las
    llamadas siguen presentándose como LIVIA. Vía sigue siendo un producto aparte.
  - El diseño neutro del prototipo «Tres direcciones» (dirección A, Geist) le gusta a Juan y se
    sigue mejorando en esa dirección, con los efectos de Claude en la bandeja y el chat (texto
    que fluye, pasos en vivo en lista, estados vivos), sin adornos. Por confirmar con Juan:
    barra lateral con etiquetas en lugar del Dock.
  - Dos modos a nivel de toda la plataforma: **normal** y **voz** (conversación con halo en
    pantalla grande; las acciones salen como tarjeta de plan con confirmación). Nombres por
    decidir (propuesta: Panel / Conversar). El modo voz es el diferenciador.
  - Posicionamiento en evaluación: «The AI system to manage your business» como mensaje de
    arriba, con las funciones concretas justo debajo y «tú apruebas»; sin prometer autonomía
    total ni cumplimiento automático de la DGII.
  - **El «manual vivo» es el modelo de diseño de todos nuestros proyectos** (Telivia, súper-admin,
    web, Vía y lo que venga), orden de Juan, 13 nov 2026. Vive en `telivia-app`, rama `diseno/v2`:
    `docs/diseno/DESIGN.md`, los tokens en `src/styles/v2/` y las piezas en `src/components/v2/`.
    Toda pieza nueva se agrega primero ahí (por ejemplo el feed en vivo y la vista de workflows), y
    los proyectos copian de ahí; no se inventan piezas sueltas por pantalla.
  - **Decisiones de diseño confirmadas por Juan el 13 nov 2026** (fuente: `docs/redisenio/DECISIONES.md` en
    telivia-app, rama `diseno/v2`): noche «Grafito medio» (#141417); esquinas suaves (8/12/16 px); navegación
    de barra lateral con todas las pestañas a la vista e íconos Lucide; editor de documento de dos paneles,
    ficha larga en secciones y diálogos en hoja lateral; detalle en panel lateral (cliente en ficha 360);
    documento minimal y correo con botón; portal de marca fuerte; entrada en dos mitades; móvil con resumen y
    hoja inferior; reportes «una pregunta por tarjeta»; vistas especiales híbridas; estados con guía de LIVIA y
    paleta con ámbitos; isotipo H con la firma «Powered by Telivia» (pequeña en letra; mediana o grande con el
    logo si se ve bien) salvo en documentos formales. La vuelta atrás del rediseño es el rollback de Vercel.
  - La línea se aplica también a la web de Telivia y al súper-admin. Habrá un manual de diseño
    único en el repo (`DESIGN.md` y su versión viva en Storybook).

## 6. Licencias y producto

- Dentro del producto: MIT, Apache, BSD, LGPL y también **GPL y AGPL** (orden de Juan, 12 nov
  2026: acepta publicar el código nuestro que se mezcle con esas piezas).
  - Cuando se use una pieza GPL o AGPL dentro del producto, el código nuestro mezclado con ella
    se publica en un repositorio público con su licencia y un enlace «Código fuente» en la app.
  - Nunca se publican datos, claves, marca, precios, textos de venta, guiones ni estrategias.
  - Sigue fuera lo que no es código abierto de verdad (licencias «fair-code» o de solo uso
    interno), como n8n dentro del producto.
- Prohibido dentro del producto: n8n, Odoo Enterprise, TEN Framework y WhatsApp no oficial.
- Herramientas internas que no se reparten pueden ser GPL o AGPL.
- Telivia no emite e-CF: le manda los datos a MSeller por API.
- Los precios de los planes de Telivia y de LIVIA van en dólares (US$) (orden de Juan, 11 nov 2026);
  los montos siguen como «ejemplo» hasta que Juan los fije.
- Producción de Lumens no se toca sin orden de Juan. Las pruebas usan datos de ejemplo y ambientes
  de prueba.
- Cero claves en código, chats o registros.
- LIVIA (orden de Juan, 12 nov 2026): la voz es Adriana en todo. Puede llamar y escribir a clientes y
  prospectos reales de Lumens con la aprobación del plan de cada tarea (o «Permitir siempre»); siempre
  dice que es LIVIA, la asistente, nunca una persona; las llamadas se graban y los chats se pueden ver.
  Planes, resultados y grabaciones se guardan en la base de Lumens con acceso por rol; las grabaciones
  se borran a los 90 días y la transcripción queda en la ficha del cliente.

- Planes de LIVIA en segundo plano (orden de Juan, 12 nov 2026): cada plan aprobado corre como
  trabajo propio en el servidor, con Trigger.dev (el que ya tenemos instalado), y LIVIA puede
  lanzar varios. Topes: 3 planes a la vez y 20 mensajes por hora entre todos. Sin aprobación del
  plan no sale ningún mensaje. La verdad (planes, avance, resultados) vive en la base de Lumens.

- Canales (orden de Juan, 12 nov 2026): Bombi (LIVIA) atiende solo WhatsApp y trabaja en modo
  automático (el modo sugerencia queda como opción en Ajustes). Las redes (Facebook, Instagram y
  Messenger) las maneja LIVIA. El Laboratorio de Bombi se construye nuestro, sin pagar un motor de
  terceros (Chatwoot, Kapso, Twilio ni Zendesk); un tercero solo se considera para Telivia, para
  ahorrar el proceso de Meta con clientes que traen su propio WhatsApp. Su diseño sigue el chat
  estándar de LIVIA, solo con librerías permitidas y al nivel del resto de la plataforma.

- **La ventaja no es el código** (principio de Juan, 12 nov 2026): Telivia, LIVIA, Vía y lo que
  venga se apoyan en código abierto ya publicado; unir esas piezas no es una ventaja competitiva
  y a Juan no le importa publicar ese código. La ventaja es el producto que sale de esa base, el
  mercadeo, los clientes, la forma de vender, la marca y la imagen. Eso nace dentro de la empresa
  y NO se publica: estrategias, ideas, precios, datos de clientes, textos de venta, guiones de
  LIVIA y material de marca.

- **Primero lo que ya existe** (orden de Juan, 12 nov 2026): somos gente de negocio, no una
  fábrica de software. Antes de construir cualquier pieza se busca una plataforma, servicio o
  proyecto de código abierto ya probado que la haga (dentro de las licencias permitidas) y se le
  presenta a Juan con su costo. Solo se desarrolla la unión entre piezas y lo que nos diferencia
  (diseño, LIVIA, reglas del negocio). Construir desde cero es la última opción y se le avisa a
  Juan antes. Vale para todos los canales, no solo Meta: correo, Telegram, SMS y los demás.

- **Motor de chats: Chatwoot Community** (orden de Juan, 12 nov 2026; cambia lo del Laboratorio
  «todo nuestro»): se instala Chatwoot de código abierto (MIT, sin la carpeta `enterprise/`) en
  nuestro servidor como motor probado para recibir y enviar chats (WhatsApp, Messenger, Instagram),
  y nuestro panel va encima por su API con nuestro diseño. Lumens sigue siendo la fuente de
  clientes, pedidos, formularios de anuncios, planes y LIVIA. Mover a dónde avisa Meta (número o
  página reales) solo con orden de Juan y después de probar con un número o página de prueba.
  Chatwoot es también el motor de chats de Telivia SaaS: cada empresa cliente con su propia
  cuenta y sus propios canales, separados de las demás.

- **Estándar antes que invento** (corrección de Juan, 12 nov 2026): en las piezas que hablan con
  Meta, WhatsApp, pagos, e-CF u otro proveedor se usa el patrón o la librería oficial del
  proveedor (por ejemplo, comprobar la firma de un aviso sobre el cuerpo exacto que llegó). No se
  escribe una versión propia. Si el estándar no cabe, se le dice a Juan antes de seguir. Antes de
  culpar a una clave o a un paso de Juan, se prueba primero nuestro código.

- **Mercadeo de LIVIA** (orden de Juan, 12 nov 2026): los topes de gasto en anuncios son por día y
  por mes, en dólares (US$). Todo cambio en anuncios pide tarjeta de aprobación, también pausar y
  bajar presupuesto. Cuántos prospectos se contactan por día lo ajusta el administrador en
  Ajustes; no va fijo en el código.

- **Telivia SaaS: una base de datos por empresa** (orden de Juan, 12 nov 2026): cada empresa
  cliente tiene su base separada; nadie ve información de otra. El panel de administración
  interno de Telivia (el nuestro, no el del cliente) se diseña aparte, con el estándar del
  mercado, lo más completo posible, y Juan lo aprueba antes de construirlo.

- **LIVIA vendedora de Lumens** (orden de Juan, 12 nov 2026): vende y negocia, no solo cotiza.
  - La escala de precios va en sus instrucciones, tomada del sistema en cada llamada o chat.
  - Puede rebajar ella sola UN escalón (el precio del escalón siguiente), solo en pedidos de 5
    cajas o más, y solo después de ofrecer subir el pedido; insiste hasta 5 veces. Más que eso
    es una oferta que pasa a la oficina, que llama en 24 horas. Esos números los cambia el
    administrador; el sistema valida cada rebaja.
  - No transfiere llamadas: toma el recado y una persona devuelve la llamada. Dice «watts».
  - Entrega 24 horas después del pedido, sin hora de corte y agendable; pago al recibir, en
    efectivo o transferencia; oficina de lunes a viernes de 8 a 6.

- **Vía** (orden de Juan, 11 y 12 nov 2026): asistente personal con personaje propio; llama y
  escribe a nombre de la persona. La prueba con familia y amigos es el producto completo, por
  TestFlight. Logo «VÍA» con las formas oficiales de Telivia; ícono de la app con la V. Idea de
  precio: US$19.99 al mes más paquetes de minutos (montos «ejemplo» hasta que Juan los fije).

- **Densidad compacta en todo el panel** (orden de Juan, 12 nov 2026): le gusta el estilo
  «compacto» y no quiere espacios vacíos. En una sola pantalla se debe poder hacer mucho, como en
  Claude, ChatGPT o Respond.io: varias columnas, lista y detalle lado a lado, tarjetas bajas con
  3 o más datos útiles, más filas por pantalla y las bandejas con varios chats a la vez. Esto
  manda sobre las alturas y espacios amplios de la skill `telivia-diseno` (botón 44, campo 48,
  tarjeta con 20 de interior): se redefinen en la base y las pantallas las siguen después.
  El dinamismo es sobrio: texto que fluye, pasos que aparecen, estados vivos, y nada de
  animaciones de adorno. Se aplica pantalla por pantalla con prototipo aprobado por Juan.
- **El Hilo de LIVIA va al estilo de Claude** (orden de Juan, 12 nov 2026): una lista plegable de
  planes con sus pasos en vivo, sin tarjetas ni barras de avance; mismos colores de la paleta.

- **Regla de espacios y mezcla de tarjetas** (orden de Juan, 12 nov 2026): una pantalla no se
  arma con 4, 5 o 6 tarjetas del mismo tamaño que parecen un cuadro. Se mezclan tarjetas de
  distintos tamaños (anchas, altas, chicas) con el contenido adentro, para dar ritmo.
  - Ninguna zona de la pantalla se ve vacía: dentro de una tarjeta, el espacio sin contenido no
    pasa de 16 px en cada lado, y una tarjeta no es más grande de lo que su contenido pide.
  - Cada tarjeta lleva su contenido a lo ancho y a lo alto (gráfica, lista o tabla que llena el
    espacio), no un dato suelto en una esquina.
  - La rejilla es de tamaños mixtos (por ejemplo 1, 2 y 3 columnas de ancho y 1 o 2 filas de
    alto) y se acomoda sin huecos: si queda un hueco, se llena con otra tarjeta o se ajusta
    el tamaño de las vecinas.
  - Cada pantalla se revisa con la medida de espacio vacío (porcentaje de área sin contenido) y
    con captura en 1280 y 1440 antes de aprobarla.

- **LIVIA tiene acceso a todo el panel** (orden de Juan, 12 nov 2026): es su mano derecha y su asistente.
  Debe poder leer toda la información del sistema (ventas por mes y por cliente, cuentas por cobrar y
  atrasadas, pedidos, facturas, inventario, gastos y más), igual que Cerebro, con el rol de quien le habla.
  Si una pregunta no cabe en una lectura fija, no responde «no sé»: busca en todo lo que se puede leer.
  Si una respuesta ya está en lo que leyó, la dice, sin seguir buscando otra cosa.

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
