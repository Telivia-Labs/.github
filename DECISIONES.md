# Decisiones de Juan: producto, diseño y negocio

Lo que Juan ya decidió sobre **qué** se construye y **cómo se ve**. Se lee siempre junto con `REGLAS.md`
(que dice **cómo se trabaja** y manda si chocan). Solo versiones vigentes; lo reemplazado está en
`HISTORIAL.md`. Una decisión nueva se escribe aquí el mismo día, con su fecha, y se quita la vieja.

## 1. Rumbo
- **Lumens primero, sin Odoo** (13 nov 2026): Odoo queda fuera del producto y sale del código (14 nov 2026,
  guardado en la etiqueta `archivo/odoo`; entrada, permisos y sesión en `src/lib/acceso` de telivia-app).
  Contabilidad ligera hecha en Lumens (606, 607, 608, IT-1, IR-17, retenciones, ITBIS de compras, estado de
  resultados simple y exportación para el contador); la completa (partida doble) cuando un cliente la pida.
- **Orden:** (1) limpiar y organizar servidor y repos; (2) probar Lumens con el diseño nuevo de 30 a 60 días y
  pulirlo; (3) convertirlo en Telivia SaaS; (4) vender solo cuando esté al más alto nivel.
- **LIVIA es un producto aparte**, vendido como módulo de Telivia SaaS. El área Agents se llama LIVIA: una sola
  asistente con funciones, con la declaración de impuestos entre ellas.
- **Copilot se descarta** (14 nov 2026): es lo mismo que la voz, que ya funciona. El modo de voz a pantalla
  completa sin usar (v2-voice) sale del código.
- **La ventaja no es el código** (12 nov 2026): se apoya en código abierto; la ventaja es el producto, el
  mercadeo, los clientes, la forma de vender, la marca y la imagen. Eso no se publica.
- **Un solo lugar para los documentos** (14 nov 2026): el repo manda. Los del rediseño viven en
  `docs/redisenio/` de telivia-app; las copias del servidor solo apuntan al repo.

## 2. Licencias
- Dentro del producto: MIT, Apache, BSD, LGPL, y también **GPL y AGPL** (12 nov 2026). El código nuestro mezclado
  con una pieza GPL o AGPL se publica en un repo público con su licencia y un enlace «Código fuente» en la app.
- Fuera del producto lo que no es código abierto de verdad («fair-code» o de solo uso interno).
- **Prohibido dentro del producto:** n8n, Odoo Enterprise, TEN Framework, WhatsApp no oficial y coss ui (Origin UI).
- Herramientas internas que no se reparten pueden ser GPL o AGPL.

## 3. Diseño (el detalle vive en `docs/diseno/DESIGN.md` de telivia-app)
- **Manual vivo único** (13 nov 2026), modelo de todos los proyectos (Telivia, súper-admin, web, Vía):
  `docs/diseno/DESIGN.md` (v1.2), tokens en `src/styles/v2/`, piezas en `src/components/v2/`. Toda pieza nueva
  se agrega primero ahí; no se inventan piezas sueltas por pantalla.
- **Nombre oficial de la línea gráfica: «Grafito»** (14 nov 2026), para todos los proyectos.
- **Línea grafito** (13 nov 2026): un solo color de marca, grafito, de día y de noche; la noche con capas
  («Grafito medio», #141417), ni plana ni negra pura. Sin barra superior y **sin personaje**.
- **Decisiones confirmadas** (13 nov 2026, fuente `docs/redisenio/DECISIONES.md`): esquinas suaves (8/12/16 px);
  barra lateral con todas las pestañas a la vista e íconos Lucide; editor de documento de dos paneles, ficha larga
  en secciones y diálogos en hoja lateral; detalle en panel lateral (cliente en ficha 360); documento minimal y
  correo con botón; portal de marca fuerte; entrada en dos mitades; móvil con resumen y hoja inferior; reportes
  «una pregunta por tarjeta»; vistas especiales híbridas; estados con guía de LIVIA; isotipo H.
- **Todo sale de librería**, nada dibujado a mano: shadcn, Magic UI, Kibo UI, Aceternity UI, Animate UI,
  React Bits, Cult UI, Motion Primitives, AI Elements y assistant-ui.
- **Efectos:** solo los de `docs/redisenio/EFECTOS.md` y los que responden a algo que hace la persona. El
  dinamismo es sobrio (texto que fluye, pasos que aparecen, estados vivos). El dinero nunca cuenta ni rueda.
- **Estilo elegido** (11 nov 2026): pestañas con raya que se desliza, tablas con fondo alterno (tipo Stripe),
  campos con etiqueta flotante y raya de color al enfocar. Tarjetas **sin borde fino** (sombra, aire y altura).
- **Densidad compacta** (12 nov 2026): mucho en una sola pantalla, como Claude, ChatGPT o Respond.io: varias
  columnas, lista y detalle lado a lado, tarjetas bajas con 3 o más datos útiles. Manda sobre las alturas amplias
  de la skill `telivia-diseno`.
- **Espacios y tarjetas** (12 nov 2026): nada de 4 a 6 tarjetas iguales en cuadro; tamaños mixtos sin huecos;
  dentro de una tarjeta el vacío no pasa de 16 px por lado; cada tarjeta llena su espacio con gráfica, lista o
  tabla. Cada pantalla se mide (porcentaje de vacío) y se captura en 1280 y 1440.
- **Revisión de cada pantalla:** grafito, día y noche, computadora (1280, 1440 y grande) y celular. Contraste
  mínimo 4.5:1.
- **Logos oficiales en SVG**, nunca escritos como texto; cambian de color con el tema.
- **Primero se muestra y se elige, después se construye** (13 nov 2026): para lo que no está decidido, una página
  con 2 o 3 opciones distintas lado a lado (datos reales, día y noche, computadora y celular) y ★ con su razón;
  todo junto en una hoja; lo elegido se escribe el mismo día en el manual; recién entonces se implementa en
  prueba. Antes se revisan los artifacts y prototipos anteriores de Juan. Cada página se revisa con captura.
- **Súper-admin y web sin prototipo nuevo** (14 nov 2026): manual v1.2 grafito + funciones del ejemplo de
  The Board; se construye directo y se revisa en pruebas. La web al más alto nivel: efectos de EFECTOS.md y
  montajes del producto en Mac y iPhone.
- Textos: se dice **«Cuentas por cobrar»** y **«Cuentas por pagar»**, nunca «Por cobrar» o «Por pagar» solos.

## 4. Marca
- **La marca del panel es Telivia** (10 nov 2026), como QuickBooks, Xero o Stripe: logo de Telivia arriba a la
  izquierda en computadora y celular; la empresa cliente como ícono cuadrado y su nombre en el selector.
- El logo y el color del cliente van en lo que reciben sus clientes (facturas, PDF, cotizaciones, correos, recibos,
  portal, página de pago) con la firma «Powered by Telivia» pequeña, igual en español e inglés, **excepto en
  documentos formales** (factura, nota de crédito, recibo). Al cliente se le piden logo cuadrado y horizontal.
  Los colores del cliente no cambian el panel.
- **LIVIA:** su logo es el de Telivia sin la T y la E, con las mismas formas. En grande va el logo; «LIVIA» en
  texto solo dentro de frases. Su imagen es el **halo de voz** (sin cara ni traje). **Habla en primera persona**
  («¿En qué te ayudo?»); chat vacío sin frase de relleno, con sugerencias de un toque arriba de la caja.
  El Hilo de LIVIA va al estilo de Claude: lista plegable de planes con pasos en vivo, sin tarjetas ni barras.
- Familia de marcas: Intelivia, Telivia, Livia y Vía. El software se llama **Telivia**; la asistente, **LIVIA**.
- Dos modos de la plataforma: **normal** y **voz** (halo en grande; las acciones salen como tarjeta de plan con
  confirmación). El modo voz es el diferenciador.
- Mensaje en evaluación: «The AI system to manage your business», con las funciones debajo y «tú apruebas»;
  sin prometer autonomía total ni cumplimiento automático de la DGII.

## 5. e-CF y dinero
- Telivia no emite e-CF: le manda los datos a **MSeller** por API.
- **Una factura con e-NCF no se anula** (13 nov 2026: la DGII no lo permite). Un e-CF aceptado se corrige con nota
  de crédito (E34); un e-NCF que nunca se envió se anula en la DGII por MSeller (anulación de secuencias).
  **Toda nota de crédito o débito recibe su propio e-NCF** (E34 o E33) y va a MSeller como cualquier e-CF.
- Los precios de los planes de Telivia y LIVIA van en **US$**; los montos son «ejemplo» hasta que Juan los fije.

## 6. LIVIA
- **Todo lo que necesita aprobación sale como tarjeta en el hilo, siempre** (orden de Juan, 14 nov 2026; regla
  general, no por herramienta): en el chat y en la voz, por una sola vía común para todas las herramientas
  (cotizar, pedir, facturar, cobrar, contactar, anuncios y las que vengan). Por voz (aclarado por Juan, 14 nov): si la
  persona le dice a LIVIA «aprobado» sobre una tarjeta que está viendo en el hilo, LIVIA la ejecuta y dice el resultado;
  si hay varias abiertas y no queda claro cuál, pregunta cuál. Nunca ofrece aprobar por su cuenta ni aprueba algo que no
  esté en pantalla. Si esto se complica, primero va solo la aprobación tocando la tarjeta y la voz se hace después. Una prueba recorre todas las herramientas que dejan algo por
  aprobar y falla si alguna no devuelve su tarjeta.
- **Nivel de Claude:** pantallas, texto de LIVIA y transiciones suaves, con buen rendimiento; nada que parezca
  aplicación barata.
- **El hilo muestra cómo se desenvuelve el trabajo, igual que Claude:** pasos de herramientas en vivo (plegables),
  estados vivos, tarjetas en su orden; mismo flujo, rendimiento y look and feel que Claude. Con librerías
  permitidas (AI Elements, assistant-ui).
- **Orbe de la voz:** va centrado en el área de la conversación, no junto con el texto (la transcripción cambia de
  ancho y de alto). Si se abre el hilo, el área se achica y el orbe se centra en ella. El texto y la tarjeta van en
  su propio espacio y no mueven ni encogen el orbe. El Orb de ElevenLabs no se modifica: se usa como en sus
  ejemplos oficiales (estado y volúmenes del SDK), para que se vea con la misma calidad que en ElevenLabs.
- **Voz:** Adriana en todo. Modelo de la voz: **Haiku 5.5** (13 nov 2026).
- **Acceso a todo el panel** (12 nov 2026), con el rol de quien le habla: si una pregunta no cabe en una lectura
  fija, busca en todo lo que se puede leer; si la respuesta ya está en lo leído, la dice.
- Puede llamar y escribir a clientes y prospectos reales de Lumens con la aprobación del plan de cada tarea
  (o «Permitir siempre»); siempre dice que es LIVIA, la asistente, nunca una persona. Las llamadas se graban,
  los chats se pueden ver; planes, resultados y grabaciones en la base de Lumens con acceso por rol; las
  grabaciones se borran a los 90 días y la transcripción queda en la ficha del cliente.
- **Planes en segundo plano:** cada plan aprobado corre como trabajo propio con Trigger.dev; topes de 3 planes
  a la vez y 20 mensajes por hora entre todos; sin aprobación no sale ningún mensaje.
- **Vendedora de Lumens:** vende y negocia. La escala de precios sale del sistema en cada llamada o chat. Puede
  rebajar sola un escalón, solo en pedidos de 5 cajas o más y después de ofrecer subir el pedido; insiste hasta 5
  veces; más que eso pasa a la oficina, que llama en 24 horas (números ajustables por el administrador; el sistema
  valida cada rebaja). No transfiere llamadas: toma el recado. Dice «watts». Entrega 24 horas después, sin hora de
  corte y agendable; pago al recibir en efectivo o transferencia; oficina de lunes a viernes de 8 a 6.
- **Mercadeo:** topes de anuncios por día y por mes en US$; todo cambio en anuncios (también pausar o bajar
  presupuesto) pide tarjeta de aprobación; los prospectos por día se ajustan en Ajustes.

## 7. Canales
- **Bombi (LIVIA)** atiende solo WhatsApp, en modo automático (el modo sugerencia queda en Ajustes). Las redes
  (Facebook, Instagram, Messenger) las maneja LIVIA.
- **Motor de chats: Chatwoot Community** (MIT, sin `enterprise/`) en nuestro servidor; nuestro panel va encima por
  su API. Lumens sigue siendo la fuente de clientes, pedidos, formularios, planes y LIVIA. Mover un número o página
  real de Meta solo con orden de Juan y después de probar con uno de prueba. En Telivia SaaS, cada empresa con su
  propia cuenta y canales.

## 8. Telivia SaaS
- **Una base de datos por empresa** (12 nov 2026); nadie ve información de otra.
- **Entrada con WorkOS** (14 nov 2026): gratis hasta un millón de usuarios al mes; se conserva al sacar Odoo.
- El panel de administración interno (súper-admin) se diseña aparte, con el estándar del mercado, lo más completo
  posible (ver §3).

## 9. Vía
- Asistente personal con personaje propio; llama y escribe a nombre de la persona. Prueba con familia y amigos con
  el producto completo, por TestFlight. Logo «VÍA» con las formas oficiales de Telivia; ícono con la V. Idea de
  precio: US$19.99 al mes más paquetes de minutos («ejemplo» hasta que Juan lo fije).

## Contabilidad completa · decisiones del 14 nov 2026

- El libro registra el ITBIS de todas las ventas. El cierre y el cuadre muestran las ventas sin
  comprobante excluidas del IT-1, con su monto e ITBIS. Libro e IT-1 se comparan sobre ventas con
  NCF/e-NCF; la diferencia total debe coincidir exactamente con el aviso.
- Ventas importadas del historial sin salida de kardex: usar el costo guardado en cada línea de
  factura, rotulado «costo importado». Ventas con kardex: conservar el costo del kardex.

## Web pública: ampliación del encargo de Juan · 14 nov 2026
- Juan pide investigación profunda con las mejores herramientas disponibles y referencias de grandes
  compañías. Quiere una web de máximo nivel, con efectos y transiciones de librería y montajes del inicio,
  chat y voz de LIVIA dentro de una MacBook. Mantener Grafito y licencias del brief: nada AGPL.
- Explorar demo interactiva guiada para crear un cliente, preparar una factura y probar ventas con voz.
  Posicionamiento deseado: sistema de inteligencia artificial para administrar o hacer crecer el negocio.
  Esto define el encargo; no aprueba todavía diseño concreto, precios, gastos, llamadas ni publicación.

## Web pública: fase 1 aún no aprobada · 14 nov 2026
- Fuente escrita de Juan: `/srv/lumens/RESPUESTA-CODEX-WEB-FASE1.md`, leída completa por Dexter.
  La fase 1 se amplía antes de pasar a planes, precios y 2–3 diseños de fase 2.
- Mensajes a estudiar: «The AI system to manage your business» / «El sistema de inteligencia artificial
  para administrar tu negocio», más variantes de crecimiento; recomendar una con ★.
- No afirmar exclusividad de IA frente a Alegra, QuickBooks y Xero; demostrar tareas dominicanas.
- La demo debe incluir Inicio/chat/orbe en MacBook, guía para cliente/factura/cuentas por cobrar/venta,
  datos ficticios, propuesta explícita de cuotas de voz y protección de gasto. Todo gasto nuevo se consulta.
- Investigar referencias IA y plataformas de demo del archivo, efectos de librería y licencia concreta,
  incluida GSAP; no AGPL. Investigar scroll para esta web actualiza el alcance del pedido, sin cambiar
  los efectos del panel ni aprobar todavía diseño o construcción.

## Web de Telivia: diseño directo y revisión continua · 14 nov 2026
- Juan aprobó el rumbo de la investigación y la entrada con demo grande en MacBook, Inicio/chat/orbe y
  navegación por pantallas principales. Se usa el diseño real de la plataforma con datos de demostración.
- El botón visible se llama **«Skip»**, también en español. No «Saltar presentación».
- Copy profesional, de negocios, IA e imagen internacional; sitio completo ES/EN y modo día/noche.
- Orden nueva: **hacer el diseño directamente, no otro prototipo**. Juan quiere ver cómo queda durante
  el trabajo en un entorno de prueba con enlace estable. Esta orden sustituye el paso de prototipo previo
  del brief para el diseño autorizado. No aprueba precios, publicación de telivia.ai, datos reales ni gastos nuevos.
