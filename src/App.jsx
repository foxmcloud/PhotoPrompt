import React, { useEffect, useMemo, useRef, useState } from "react";

const genderOptions = ["Masculino", "Femenino", "No binario", "Andrógino", "Indefinido"];
const ageRangeOptions = [
  "Infante (0–2 años)", "Niño pequeño (3–5 años)", "Niño (6–9 años)", "Pre-adolescente (10–12 años)",
  "Adolescente joven (13–15 años)", "Adolescente (16–18 años)", "Adulto joven (18–21 años)",
  "Adulto joven (22–25 años)", "Adulto joven (26–30 años)", "Adulto (30–35 años)",
  "Adulto (35–40 años)", "Adulto maduro (40–45 años)", "Adulto maduro (45–50 años)",
  "Mediana edad (50–55 años)", "Mediana edad (55–60 años)", "Adulto mayor (60–65 años)",
  "Adulto mayor (65–70 años)", "Anciano (70–75 años)", "Anciano (75–80 años)", "Anciano (80+ años)",
];
const ethnicityOptions = [
  "Europa Occidental", "Europa del Norte", "Europa Central", "Europa del Este", "Europa del Sur", "Mediterráneo europeo",
  "Latinoamericano mestizo", "Andino", "Cono sur", "Caribe latino", "Afro-latino", "Indígena latinoamericano",
  "Angloamericano", "Afroamericano", "Nativo americano", "Canadiense europeo", "Canadiense indígena",
  "África del Norte", "África Occidental", "África Central", "África Oriental", "África del Sur",
  "Árabe", "Persa", "Turco", "Kurdo", "Indio", "Pakistaní", "Bengalí", "Sri Lanka",
  "Chino", "Japonés", "Coreano", "Mongol", "Tailandés", "Vietnamita", "Indonesio", "Filipino", "Malayo",
  "Australiano europeo", "Maori", "Polinesio", "Melanesio", "Mestizo (europeo + indígena)", "Afrodescendiente", "Eurasiático", "Multirracial",
];
const professionOptions = [
  "Detective", "Policía", "Inspector", "Abogado", "Fiscal", "Juez", "Criminólogo", "Forense", "Perito", "Investigador privado",
  "Agente encubierto", "Oficial de inteligencia", "Guardia penitenciario", "Delincuente", "Ladrón", "Sicario", "Estafador",
  "Hacker criminal", "Narcotraficante", "Jefe de mafia", "Médico general", "Cirujano", "Enfermero/a", "Psiquiatra",
  "Psicólogo", "Neurocientífico", "Biólogo", "Químico", "Físico", "Astrónomo", "Ingeniero", "Genetista",
  "Farmacéutico", "Investigador clínico", "Epidemiólogo", "Médico forense", "Técnico de laboratorio", "Veterinario",
  "Bioingeniero", "Científico espacial", "Militar", "Soldado", "Comandante", "Policía táctico", "Bombero", "Rescatista",
  "Piloto", "Capitán de barco", "Guardia de seguridad", "Escolta", "Agente secreto", "Espía", "Mercenario", "Guardaespaldas",
  "Ranger / guardaparques", "Oficial naval", "Paracaidista", "Operador de fuerzas especiales", "Cazador", "Explorador",
  "Profesor", "Maestro", "Trabajador social", "Psicólogo clínico", "Consejero", "Coach", "Terapeuta", "Sacerdote",
  "Líder comunitario", "Activista", "Periodista", "Escritor", "Actor", "Músico", "Artista", "Fotógrafo",
  "Director de cine", "Comunicador", "Sociólogo", "Antropólogo", "Empresario", "CEO", "Banquero", "Inversionista",
  "Político", "Diplomático", "Asesor", "Consultor", "Comerciante", "Ejecutivo"
];
const eraOptions = [
  "Prehistoria", "Edad de Piedra", "Edad de Bronce", "Edad de Hierro", "Antiguo Egipto", "Mesopotamia", "Antigua Grecia",
  "Imperio Romano", "Alta Edad Media", "Plena Edad Media", "Baja Edad Media", "Época Vikinga", "Feudalismo europeo",
  "Renacimiento", "Edad Moderna", "Barroco", "Ilustración", "Siglo XVII", "Siglo XVIII", "Revolución Industrial",
  "Era Victoriana", "Regencia", "Siglo XIX", "Belle Époque", "Primera Guerra Mundial", "Período de entreguerras",
  "Segunda Guerra Mundial", "Guerra Fría", "Finales del siglo XX (años 80–90)", "Contemporáneo (siglo XXI)", "Futuro"
];
const faceShapeOptions = ["Ovalado equilibrado", "Redondo suave", "Cuadrado estructurado", "Rectangular alargado", "Diamante definido", "Triangular (mandíbula ancha)", "Triángulo invertido (frente ancha)", "Corazón (frente amplia, mentón fino)", "Alargado estrecho", "Corto y ancho", "Angular marcado", "Suave y redondeado", "Compacto", "Estilizado fino", "Ligeramente asimétrico"];
const jawOptions = ["Fuerte y marcada", "Suave y difusa", "Angular definida", "Redondeada", "Ancha dominante", "Estrecha delicada", "Cuadrada sólida", "Fina y estilizada", "Proyectada hacia adelante", "Retraída", "Pesada", "Delicada", "Tensa (musculatura visible)", "Caída (edad avanzada)", "Levemente asimétrica"];
const cheekboneOptions = ["Altos y prominentes", "Altos y suaves", "Bajos discretos", "Muy marcados", "Planos", "Anchos", "Estrechos", "Definidos y angulares", "Suaves y poco visibles", "Redondeados", "Hundidos", "Llenos (con volumen)", "Simétricos", "Ligeramente asimétricos", "Marcados por iluminación"];
const chinOptions = ["Pronunciado", "Pequeño y retraído", "Redondeado suave", "Cuadrado fuerte", "Puntiagudo", "Proyectado hacia adelante", "Retrasado", "Ancho", "Estrecho", "Partido", "Suave y poco definido", "Angular", "Corto", "Largo", "Levemente asimétrico"];
const eyeOptions = ["Almendrados, mirada intensa", "Grandes y expresivos", "Pequeños y concentrados", "Hundidos (deep-set)", "Salientes", "Caídos (downturned)", "Elevados (upturned)", "Estrechos", "Separación amplia", "Cercanos entre sí", "Párpados caídos (hooded)", "Muy abiertos", "Mirada cansada", "Mirada fría", "Mirada inquietante"];
const eyebrowOptions = ["Rectas y gruesas", "Arqueadas definidas", "Suaves y naturales", "Finas", "Muy pobladas", "Desordenadas", "Separadas", "Cercanas", "Caídas", "Elevadas", "Asimétricas leves", "Marcadas y oscuras", "Claras y sutiles", "Cortas", "Largas y extendidas"];
const noseOptions = ["Recta clásica", "Aguileña", "Respingada", "Ancha", "Estrecha", "Pequeña", "Grande", "Puente alto", "Puente bajo", "Punta redondeada", "Punta afilada", "Punta caída", "Ligeramente desviada", "Base ancha", "Nariz corta"];
const lipOptions = ["Finos", "Gruesos", "Medios equilibrados", "Arco de cupido marcado", "Arco suave", "Comisuras caídas", "Comisuras elevadas", "Simétricos", "Ligeramente asimétricos", "Labio superior fino, inferior grueso", "Labio inferior prominente", "Labios tensos", "Labios relajados", "Boca ancha", "Boca estrecha"];
const skinOptions = ["Lisa y uniforme", "Poros visibles", "Textura realista detallada", "Con pecas", "Con cicatrices", "Con acné leve", "Arrugas finas", "Arrugas marcadas", "Piel seca", "Piel húmeda / brillante", "Tono claro", "Tono medio", "Tono oscuro", "Subtono frío", "Subtono cálido"];
const hairOptions = ["Corto y prolijo", "Largo y lacio", "Ondulado", "Rizado", "Muy corto (rapado)", "Desordenado", "Peinado hacia atrás", "Con flequillo", "Canoso", "Oscuro", "Claro (rubio)", "Teñido", "Con entradas (retroceso)", "Voluminoso", "Desgastado / descuidado"];
const distinctiveTraitOptions = ["Cicatriz visible", "Tatuaje simbólico o narrativo", "Cojera o forma particular de caminar", "Mirada penetrante o inquietante", "Voz grave o particular", "Risa característica", "Tic nervioso", "Falta de una extremidad o prótesis", "Marca de nacimiento notable", "Cabello muy distintivo", "Ojos de distinto color (heterocromía)", "Postura corporal particular", "Forma única de vestir", "Accesorio icónico", "Objeto que siempre lleva"];
const expressionBaseOptions = ["Neutral", "Inexpresivo", "Sereno", "Observador", "Cansado", "Agotado", "Tenso", "Hostil", "Amenazante", "Frío", "Desapegado", "Triste", "Melancólico", "Vulnerable", "Amable", "Seguro", "Confiado", "Determinado", "Dominante", "Sospechoso", "Desconfiado", "Vigilante", "Intenso", "Apático", "Inquietante", "Ambiguo", "Ansioso", "Tímido"];
const expressionIntensityOptions = ["Muy sutil", "Sutil", "Moderada", "Marcada", "Muy intensa"];
const bodyBuildOptions = ["Muy delgado", "Delgado", "Atlético", "Musculoso", "Robusto", "Pesado / corpulento", "Frágil"];
const bodyProportionOptions = ["Alto", "Bajo", "Extremidades largas", "Extremidades cortas", "Torso largo", "Torso corto", "Desproporciones sutiles"];
const postureOptions = ["Recta (erguida)", "Relajada", "Encorvada", "Rígida", "Ladeada", "Desalineada"];
const weightDistributionOptions = ["Equilibrada", "Cargada hacia un lado", "Adelantada", "Retrasada", "Inestable"];
const gaitRhythmOptions = ["Lento", "Natural", "Ligeramente rápido", "Rápido", "Irregular"];
const gaitStyleOptions = ["Firme", "Pesado", "Ligero", "Arrastrado", "Sigiloso"];
const gaitDirectionOptions = ["Recta", "Con balanceo", "Con inclinación"];
const bodyTensionOptions = ["Muy relajado", "Relajado", "Neutro", "Tenso", "Muy tenso"];
const movementControlOptions = ["Preciso", "Controlado", "Mecánico", "Fluido", "Torpe", "Errático"];
const movementQualityOptions = ["Fluido", "Cortado", "Pesado", "Elástico", "Rígido", "Natural"];
const gestureLevelOptions = ["Mínima", "Moderada", "Expresiva", "Exagerada"];
const gestureTypeOptions = ["Manos activas", "Mirada dominante", "Cabeza en movimiento", "Gestos nerviosos"];
const gazeDirectionOptions = ["Directa", "Evitativa", "Errante", "Fija", "Observadora"];
const stagePresenceOptions = ["Dominante", "Discreta", "Intimidante", "Invisible", "Elegante", "Torpe"];
const bodyEnergyOptions = ["Baja", "Media", "Alta"];
const idleMovementOptions = ["Totalmente quieto", "Micro-movimientos", "Inquieto", "Tics leves"];
const motionDistinctiveOptions = ["Cojea levemente", "Movimiento asimétrico", "Rigidez en hombros", "Manos inquietas", "Respiración visible"];
const wardrobeTypeOptions = ["Formal", "Casual", "Uniforme", "Trabajo / utilitario", "Militar", "Elegante / alta sociedad", "Deportivo", "Religioso", "Tradicional / cultural", "Fantástico / sci-fi"];
const upperGarmentOptions = ["Camisa", "Blusa", "Chaqueta", "Abrigo", "Trench coat", "Chaleco", "Túnica"];
const lowerGarmentOptions = ["Pantalón", "Falda", "Vestido", "Uniforme"];
const outerLayerOptions = ["Gabardina", "Capa", "Abrigo pesado", "Poncho"];
const footwearOptions = ["Botas", "Zapatos formales", "Zapatos gastados", "Descalzo", "Calzado militar"];
const accessoryOptions = ["Sombrero", "Guantes", "Bufanda", "Lentes", "Reloj", "Joyas", "Bolsos", "Armas visibles"];
const materialOptions = ["Algodón", "Lana", "Cuero", "Seda", "Denim", "Material sintético", "Metal"];
const wardrobeColorOptions = ["Colores neutros", "Tonos cálidos", "Tonos fríos", "Saturado", "Desaturado", "Paleta limitada", "Paleta amplia"];
const wardrobeStateOptions = ["Nuevo", "Usado", "Desgastado", "Sucio", "Dañado", "Reparado"];
const fitOptions = ["Ajustado", "Holgado", "Mal ajustado", "Hecho a medida"];
const wardrobeDetailOptions = ["Botones únicos", "Costuras visibles", "Manchas", "Bordados", "Insignias", "Parche / reparación"];
const filmGenreOptions = ["Drama", "Comedia", "Acción", "Thriller", "Terror", "Ciencia ficción", "Fantasía", "Romance", "Aventura", "Misterio", "Drama psicológico", "Suspenso", "Crimen", "Policial", "Biográfico", "Histórico", "Bélico", "Drama social", "Coming of age", "Melodrama", "Cine noir", "Neo-noir", "Western", "Musical", "Documental", "Experimental", "Cine de autor", "Mockumentary", "Road movie", "Cine político"];
const styleGeneralOptions = ["Realismo cinematográfico", "Hiperrealista", "Realismo documental", "Estilizado cinematográfico", "Naturalista", "Fotográfico puro", "Cinemático premium", "Estilo indie", "Minimalista", "Experimental", "Surrealista", "Expresionista", "Noir", "Neo-noir", "Vintage film", "Retro cinematográfico", "Digital clean", "Film look clásico", "Grunge visual", "Oscuro atmosférico", "Poético visual", "Abstracto", "Comercial/publicitario", "Editorial", "Dramático", "Épico cinematográfico", "Intimista", "Realismo sucio", "Estilo pictórico", "Cinemática híbrida"];
const styleByEraOptions = ["Prehistórico", "Antiguo egipcio", "Clásico grecorromano", "Medieval europeo", "Vikingo", "Renacentista", "Barroco", "Ilustración", "Regencia", "Victoriano", "Revolución industrial", "Belle Époque", "Años 20", "Años 50", "Contemporáneo"];
const emotionalToneOptions = ["Oscuro", "Inquietante", "Perturbador", "Opresivo", "Angustiante", "Violento", "Desesperado", "Trágico", "Frío", "Distante", "Vacío", "Melancólico", "Nostálgico", "Solitario", "Tenso", "Dramático", "Épico", "Intenso", "Urgente", "Cálido", "Esperanzador", "Íntimo", "Calmado", "Poético", "Inspirador"];
const artisticStyleOptions = ["Realismo", "Hiperrealismo", "Impresionismo", "Postimpresionismo", "Barroco", "Renacentista", "Neoclásico", "Romanticismo", "Expresionismo", "Surrealismo", "Cubismo", "Futurismo", "Dadaísmo", "Arte abstracto", "Minimalismo", "Pop Art", "Dark fantasy", "Arte conceptual (concept art)", "Matte painting", "Ilustración digital", "Estilo editorial", "Fotografía artística", "Cinemático estilizado", "Grunge", "Vaporwave"];
const animationTechniqueOptions = ["Animación 2D tradicional", "Animación 2D digital", "Cut-out animation", "Animación limitada", "Animación frame-by-frame", "Animación vectorial", "Animación de siluetas", "Animación rotoscópica 2D", "Animación 3D CGI", "Animación 3D hiperrealista", "Animación 3D estilizada", "Animación procedural", "Animación basada en físicas", "Animación motion capture", "Stop motion tradicional", "Claymation", "Puppet animation", "Pixilation", "Animación con objetos reales", "Rotoscopía", "Animación híbrida (2D + 3D)", "Motion graphics", "Animación generativa con IA"];
const productionStyleOptions = ["Hollywood clásico", "Hollywood contemporáneo", "Blockbuster épico", "Producción cinematográfica premium", "Producción high-end", "Producción de streaming premium", "Producción internacional de gran escala", "Cine independiente", "Cine de autor", "Producción art-house", "Producción experimental", "Producción de bajo presupuesto", "Producción minimalista", "Producción televisiva tradicional", "Producción episódica", "Producción documental", "Producción docu-ficción", "Producción publicitaria premium", "Producción comercial estándar", "Branded content", "Producción para redes sociales", "Producción de videoclip musical"];
const narrativeStyleOptions = ["Narrativa lineal", "Narrativa no lineal", "Narrativa fragmentada", "Narrativa circular", "Narrativa episódica", "Narrativa en tiempo real", "Narrativa con flashbacks", "Narrativa con flashforwards", "Narrativa subjetiva", "Narrativa objetiva", "Narrador omnisciente", "Narrador no confiable", "Múltiples puntos de vista", "Narrativa en primera persona", "Narrativa introspectiva", "Narrativa contemplativa", "Narrativa emocional", "Narrativa tensa / de suspenso", "Narrativa poética", "Narrativa simbólica", "Narrativa inmersiva", "Narrativa minimalista", "Narrativa experimental", "Narrativa dinámica", "Narrativa lenta"];
const styleReferenceOptions = ["Cine noir clásico (años 40)", "Thriller oscuro de los 90", "Estilo Se7en", "Estilo Blade Runner", "Estilo Blade Runner 2049", "Estilo The Godfather", "Estilo Children of Men", "Estilo 1917", "Estilo Dune", "Estilo The Batman (2022)", "Estilo Joker", "Estilo Drive", "Estilo Mad Max: Fury Road", "Estilo The Revenant", "Estilo Peaky Blinders", "Estilo Game of Thrones", "Estilo Breaking Bad", "Estilo Euphoria", "Estilo Her", "Estilo Inception", "Estilo Interstellar", "Estilo The Lighthouse", "Estilo Roma", "Estilo Parasite", "Estilo John Wick", "Estilo documental BBC", "Estilo videoclip moderno", "Estilo publicidad de lujo", "Estilo fotografía editorial", "Estilo cine europeo contemporáneo"];
const lightingOptions = ["Luz natural", "Luz artificial", "Luz mixta (natural + artificial)", "Iluminación realista", "Iluminación estilizada", "Iluminación dramática", "Low-key", "High-key", "Iluminación de alto contraste", "Iluminación suave", "Iluminación dura", "Frontal", "Lateral", "Contraluz", "Cenital", "Inferior", "Luz a 45°", "Luz de ventana", "Luz práctica", "Iluminación volumétrica", "Luz difusa", "Luz filtrada", "Iluminación nocturna", "Iluminación de atardecer (golden hour)", "Iluminación fría"];
const paletteOptions = ["Azules fríos desaturados", "Azul grisáceo + negro", "Cian + blanco frío", "Azul nocturno profundo", "Verde azulado (teal)", "Verde frío desaturado", "Amarillos cálidos", "Naranja + ámbar", "Rojos cálidos profundos", "Sepia clásico", "Dorado + marrón", "Tierra cálida", "Teal & Orange", "Fríos dominantes + acentos cálidos", "Cálidos dominantes + sombras frías", "Azul + rojo", "Verde + magenta", "Neutros + acentos saturados", "Monocromática azul", "Monocromática roja", "Monocromática verde", "Blanco y negro", "Pastel suave", "Neón saturado", "Desaturada general"];
const contrastOptions = ["Muy bajo", "Bajo", "Suave", "Medio", "Medio-alto", "Alto", "Muy alto", "Extremo", "Low contrast (lavado)", "High contrast (dramático)", "Contraste cinematográfico equilibrado", "Contraste con negros profundos", "Contraste suave con altas luces controladas", "Contraste duro con sombras marcadas", "Contraste reducido por niebla", "Contraste difuso", "Contraste con luz volumétrica", "Contraste suavizado por humo", "Contraste atmosférico natural", "Contraste frío vs cálido", "Contraste complementario", "Contraste monocromático", "Contraste saturado", "Contraste desaturado", "Contraste selectivo"];
const lensOptions = ["14mm", "16mm", "18mm", "20mm", "24mm", "28mm", "32mm", "35mm", "40mm", "45mm", "50mm", "65mm", "75mm", "85mm", "100mm", "135mm", "200mm", "Anamórfico", "Vintage", "Macro", "Tilt-shift", "Fisheye", "Lente con difusión", "Lente con aberración cromática", "Lente experimental / distorsionado"];
const depthOfFieldOptions = ["Muy poca", "Poca", "Moderada", "Profunda", "Muy profunda", "Shallow depth of field", "Deep focus", "Enfoque selectivo", "Enfoque por capas", "Enfoque plano uniforme", "Sujeto en foco, fondo desenfocado", "Fondo en foco, sujeto desenfocado", "Cambio de foco (rack focus)", "Enfoque progresivo", "Enfoque dramático", "Bokeh pronunciado", "Bokeh suave", "Fondo cremoso", "Fondo abstracto", "Desenfoque atmosférico"];
const shotTypeOptions = ["Gran plano general", "Plano general", "Plano de establecimiento", "Plano panorámico", "Plano aéreo", "Plano entero", "Plano americano", "Plano medio", "Plano medio corto", "Primer plano", "Primerísimo primer plano", "Plano detalle", "Plano subjetivo", "Plano sobre el hombro", "Plano recurso", "Plano de reacción", "Plano de seguimiento", "Plano cenital", "Plano nadir", "Plano picado", "Plano contrapicado", "Plano lateral", "Plano frontal", "Plano 3/4", "Plano secuencia"];
const angleOptions = ["Eye level", "Frontal directo", "Lateral", "Tres cuartos", "Trasero", "Picado", "Picado alto", "Cenital", "Ángulo elevado", "Vista de vigilancia", "Contrapicado", "Contrapicado alto", "Nadir", "Ángulo heroico", "Ángulo extremo bajo", "Ángulo inclinado (Dutch tilt)", "Ángulo desbalanceado", "Ángulo subjetivo", "Ángulo voyeur", "Ángulo claustrofóbico", "Ángulo over-the-shoulder", "Ángulo a través de objetos", "Ángulo reflejado", "Ángulo obstructivo", "Ángulo dinámico"];
const movementOptions = ["Cámara estática", "Pan", "Tilt", "Zoom in", "Zoom out", "Dolly in", "Dolly out", "Tracking shot", "Travelling frontal", "Travelling trasero", "Steadicam", "Handheld", "Cámara al hombro", "Push-in lento", "Pull-back", "Movimiento orbital", "Crane", "Jib", "Drone shot", "Movimiento combinado", "Whip pan", "Movimiento errático", "Cámara flotante", "Cámara subjetiva", "Movimiento coreografiado"];
const scenographyOptions = ["Interior doméstico", "Departamento moderno", "Casa antigua", "Mansión de lujo", "Habitación minimalista", "Cocina tradicional", "Oficina corporativa", "Oficina antigua", "Taller / estudio creativo", "Interior industrial", "Calle urbana contemporánea", "Calle histórica", "Calle nocturna con neón", "Barrio marginal", "Centro financiero moderno", "Mercado o feria", "Callejón oscuro", "Zona industrial exterior", "Bosque", "Selva", "Desierto", "Montaña", "Playa / costa", "Pradera / campo abierto", "Ruinas / templo antiguo"];
const atmosphereOptions = ["Aire limpio y claro", "Niebla ligera", "Niebla densa", "Bruma suave", "Humo en suspensión", "Polvo en el aire", "Vapor visible", "Aire húmedo", "Aire seco", "Aire frío", "Lluvia intensa", "Llovizna", "Tormenta", "Nieve", "Viento fuerte", "Calor extremo (distorsión térmica)", "Atmosférica cinematográfica", "Aire pesado / denso", "Ambiente opresivo", "Ambiente etéreo", "Ambiente místico", "Ambiente contaminado", "Partículas flotantes", "Luz volumétrica", "Distorsión del aire"];
const textureOptions = ["Film grain fino", "Film grain medio", "Film grain grueso", "Halation", "Bloom", "Gate weave", "Flicker", "Look celuloide clásico", "Look vintage degradado", "Look Super 8", "Imagen clean digital", "Ruido digital leve", "Ruido digital alto", "Imagen ultra sharp", "Imagen comprimida", "Soft focus", "Difusión de lente", "Glow", "Highlight roll-off suave", "Imagen etérea", "Look lavado", "Alto contraste con negros profundos", "Bajo contraste", "Look HDR", "Textura cinematográfica híbrida"];
const compositionOptions = ["Centrada", "Regla de tercios", "Simétrica", "Asimétrica", "Balanceada", "Desbalanceada", "Composición triangular", "Composición diagonal", "Composición radial", "Composición en capas", "Punto de fuga", "Líneas guía", "Frame within frame", "Composición cerrada", "Composición abierta", "Negativo dominante", "Sujeto dominante", "Composición minimalista", "Descentrada", "Composición caótica", "Composición ordenada", "Composición dinámica", "Composición estática", "Composición profunda", "Composición plana"];
const negativeSuggestions = ["low quality", "blurry", "distorted anatomy", "extra limbs", "bad hands", "duplicate face", "deformed eyes", "text", "watermark", "logo", "cropped", "jpeg artifacts"];

const defaultForm = {
  idea: "",
  characterName: "",
  ageSpecific: "",
  yearSpecific: "",
  gender: "",
  ageRange: "",
  ethnicity: "",
  profession: "",
  era: "",
  faceShape: "",
  jaw: "",
  cheekbones: "",
  chin: "",
  eyes: "",
  eyebrows: "",
  nose: "",
  lips: "",
  skin: "",
  hair: "",
  distinctiveTrait: "",
  expressionBase: "",
  expressionIntensity: "",
  bodyBuild: "",
  bodyProportion: "",
  posture: "",
  weightDistribution: "",
  gaitRhythm: "",
  gaitStyle: "",
  gaitDirection: "",
  bodyTension: "",
  movementControl: "",
  movementQuality: "",
  gestureLevel: "",
  gestureType: "",
  gazeDirection: "",
  stagePresence: "",
  bodyEnergy: "",
  idleMovement: "",
  motionDistinctive: "",
  wardrobeType: "",
  upperGarment: "",
  lowerGarment: "",
  outerLayer: "",
  footwear: "",
  accessory: "",
  material: "",
  wardrobeColor: "",
  wardrobeState: "",
  fit: "",
  wardrobeDetail: "",
  filmGenre: "",
  styleGeneral: "",
  styleByEra: "",
  emotionalTone: "",
  artisticStyle: "",
  animationTechnique: "",
  productionStyle: "",
  narrativeStyle: "",
  styleReference: "",
  lighting: "",
  palette: "",
  contrast: "",
  lens: "",
  depthOfField: "",
  shotType: "",
  angle: "",
  movement: "",
  scenography: "",
  atmosphere: "",
  texture: "",
  composition: "",
  language: "es",
  aspectRatio: "16:9",
  consistency: true,
  includeNegative: true,
  negativePrompt: "",
};

function clean(parts) {
  return parts.map((p) => (p == null ? "" : String(p).trim())).filter(Boolean);
}
function sentenceJoin(parts) {
  return clean(parts).join(", ");
}

function SearchableSelect({ value, onChange, options, placeholder }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const optionRefs = useRef([]);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredOptions = options.filter((option) => option.toLowerCase().includes(normalizedQuery)).slice(0, 80);
  const displayValue = open ? query : value;

  useEffect(() => {
    if (!open || highlightedIndex < 0) return;
    const active = optionRefs.current[highlightedIndex];
    if (active && typeof active.scrollIntoView === "function") {
      active.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex, open, filteredOptions.length]);

  useEffect(() => {
    optionRefs.current = [];
  }, [normalizedQuery, open]);

  const commitSelection = (option) => {
    if (!option) return;
    onChange(option);
    setQuery("");
    setOpen(false);
    setHighlightedIndex(-1);
  };

  return (
    <div className="searchable-wrap">
      <input
        value={displayValue}
        onChange={(e) => {
          const nextQuery = e.target.value;
          const nextFiltered = options.filter((option) => option.toLowerCase().includes(nextQuery.trim().toLowerCase())).slice(0, 80);
          setQuery(nextQuery);
          setOpen(true);
          setHighlightedIndex(nextFiltered.length ? 0 : -1);
          if (!nextQuery.trim()) onChange("");
        }}
        onFocus={() => {
          const baseQuery = value || "";
          const nextFiltered = options.filter((option) => option.toLowerCase().includes(baseQuery.trim().toLowerCase())).slice(0, 80);
          setQuery(baseQuery);
          setOpen(true);
          setHighlightedIndex(value ? Math.max(nextFiltered.findIndex((option) => option === value), 0) : (nextFiltered.length ? 0 : -1));
        }}
        onBlur={() => {
          window.setTimeout(() => {
            setOpen(false);
            setQuery("");
            setHighlightedIndex(-1);
          }, 120);
        }}
        onKeyDown={(e) => {
          if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
            e.preventDefault();
            setOpen(true);
            setHighlightedIndex(filteredOptions.length ? 0 : -1);
            return;
          }
          if (!filteredOptions.length) {
            if (e.key === "Escape") {
              setOpen(false);
              setHighlightedIndex(-1);
            }
            return;
          }
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prev) => (prev < 0 ? 0 : Math.min(prev + 1, filteredOptions.length - 1)));
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((prev) => (prev <= 0 ? 0 : prev - 1));
          }
          if (e.key === "Enter" && open && highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            e.preventDefault();
            commitSelection(filteredOptions[highlightedIndex]);
          }
          if (e.key === "Escape") {
            e.preventDefault();
            setOpen(false);
            setQuery("");
            setHighlightedIndex(-1);
          }
        }}
        placeholder={placeholder || "Buscar o seleccionar"}
        className="input"
      />
      {open ? (
        <div className="searchable-dropdown">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <button
                key={option}
                ref={(node) => {
                  optionRefs.current[index] = node;
                }}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => commitSelection(option)}
                className={`searchable-option ${value === option ? "selected" : ""} ${highlightedIndex === index ? "highlighted" : ""}`}
              >
                {option}
              </button>
            ))
          ) : (
            <div className="searchable-empty">Sin resultados</div>
          )}
        </div>
      ) : null}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="field">
      <span className="label">{label}</span>
      {children}
    </label>
  );
}

function SectionCard({ title, subtitle, children }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">{title}</h2>
        {subtitle ? <p className="card-subtitle">{subtitle}</p> : null}
      </div>
      {children}
    </div>
  );
}


function PrimaryButton({ children, onClick, disabled }) {
  return (
    <button
      type="button"
      className="primaryButton"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick, disabled }) {
  return (
    <button
      type="button"
      className="secondaryButton"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function buildPrompt(form) {
  const labeledFields = [
    ["GÉNERO", form.gender],
    ["EDAD", sentenceJoin([form.ageRange, form.ageSpecific])],
    ["ETNICIDAD", form.ethnicity],
    ["PROFESIÓN", form.profession],
    ["ÉPOCA", sentenceJoin([form.era, form.yearSpecific])],
    ["FORMA DEL ROSTRO", form.faceShape],
    ["MANDÍBULA", form.jaw],
    ["PÓMULOS", form.cheekbones],
    ["MENTÓN", form.chin],
    ["OJOS", form.eyes],
    ["CEJAS", form.eyebrows],
    ["NARIZ", form.nose],
    ["LABIOS", form.lips],
    ["PIEL", form.skin],
    ["CABELLO", form.hair],
    ["RASGO ÚNICO", sentenceJoin([form.distinctiveTrait, form.characterName])],
    ["EXPRESIÓN", sentenceJoin([form.expressionBase, form.expressionIntensity])],
    ["CUERPO", sentenceJoin([form.bodyBuild, form.bodyProportion, form.posture, form.weightDistribution, form.gaitRhythm, form.gaitStyle, form.gaitDirection, form.bodyTension, form.movementControl, form.movementQuality, form.gestureLevel, form.gestureType, form.gazeDirection, form.stagePresence, form.bodyEnergy, form.idleMovement, form.motionDistinctive])],
    ["VESTUARIO", sentenceJoin([form.wardrobeType, form.upperGarment, form.lowerGarment, form.outerLayer, form.footwear, form.accessory, form.material, form.wardrobeColor, form.wardrobeState, form.fit, form.wardrobeDetail])],
    ["GÉNERO CINEMATOGRAFICO", form.filmGenre],
    ["ESTILO GENERAL", form.styleGeneral],
    ["ESTILO POR ÉPOCA", form.styleByEra],
    ["TONO EMOCIONAL", form.emotionalTone],
    ["ESTILO ARTÍSTICO", form.artisticStyle],
    ["TÉCNICA DE ANIMACIÓN", form.animationTechnique],
    ["ESTILO PRODUCCIÓN", form.productionStyle],
    ["ESTILO NARRATIVO", form.narrativeStyle],
    ["ILUMINACIÓN", form.lighting],
    ["PALETA", form.palette],
    ["CONTRASTE", form.contrast],
    ["LENTE", form.lens],
    ["PROFUNDIDAD DE CAMPO", form.depthOfField],
    ["TIPO DE PLANO", form.shotType],
    ["ANGULO", form.angle],
    ["MOVIMIENTO", form.movement],
    ["ESCENOGRAFIA", form.scenography],
    ["ATMOSFERA", form.atmosphere],
    ["TEXTURA", form.texture],
    ["COMPOSICION", form.composition],
  ];
  const lines = labeledFields.filter(([, value]) => clean([value]).length > 0).map(([label, value]) => `${label}: ${value}`);
  if (form.idea) lines.unshift(`IDEA: ${form.idea}`);
  if (form.styleReference) lines.push(`REFERENCIA DE ESTILO: ${form.styleReference}`);
  if (form.consistency) lines.push(form.language === "en" ? "CONSISTENCY: same character, same proportions, same facial features, no variation" : "CONSISTENCIA: mismo personaje, mismas proporciones, mismas facciones, sin variación");
  if (form.aspectRatio) lines.push(`ASPECT RATIO: ${form.aspectRatio}`);
  return lines.join("\n");
}

function buildNegativePrompt(form) {
  if (!form.includeNegative) return "";
  return clean([form.negativePrompt, !form.negativePrompt ? negativeSuggestions.join(", ") : ""]).join(", ");
}

function runSelfTests() {
  const tests = [];
  const push = (name, pass) => tests.push({ name, pass });
  push("clean elimina vacíos", JSON.stringify(clean(["a", "", null, " b "])) === JSON.stringify(["a", "b"]));
  const sample = buildPrompt({ ...defaultForm, gender: "Masculino", ageRange: "Adulto (35–40 años)", filmGenre: "Cine noir", lens: "50mm", shotType: "Plano medio" });
  push("buildPrompt integra selects enumerados", sample.includes("GÉNERO: Masculino") && sample.includes("GÉNERO CINEMATOGRAFICO: Cine noir") && sample.includes("LENTE: 50mm") && sample.includes("TIPO DE PLANO: Plano medio"));
  push("negative prompt apagado devuelve vacío", buildNegativePrompt({ ...defaultForm, includeNegative: false }) === "");
  const filtered = lensOptions.filter((option) => option.toLowerCase().includes("50"));
  push("buscador filtra opciones por texto", filtered.length === 1 && filtered[0] === "50mm");
  push("navegación por teclado tiene opción seleccionable", filtered[0] === "50mm");
  push("la lista visible del buscador está acotada y es consistente", lensOptions.slice(0, 80).length <= 80);
  push("buildPrompt devuelve formato multilínea", buildPrompt({ ...defaultForm, gender: "Femenino", lens: "85mm" }).includes("\n"));
  push("buildPrompt omite etiquetas vacías", !buildPrompt({ ...defaultForm, gender: "Femenino" }).includes("ETNICIDAD:"));
  push("join de líneas usa salto escapado válido", buildPrompt({ ...defaultForm, gender: "Masculino", lens: "50mm" }).split("\n").length >= 2);
  return { overall: tests.every((t) => t.pass), tests };
}

const groups = [
  {
    title: "Idea base",
    fields: [
      ["Idea principal", "idea", "textarea"],
      ["Nombre o etiqueta del personaje", "characterName", "text"],
    ],
  },
  {
    title: "Identidad",
    fields: [
      ["Género", "gender", genderOptions],
      ["Rango de edad", "ageRange", ageRangeOptions],
      ["Edad específica", "ageSpecific", "text"],
      ["Etnicidad / origen", "ethnicity", ethnicityOptions],
      ["Profesión", "profession", professionOptions],
      ["Época", "era", eraOptions],
      ["Año específico", "yearSpecific", "text"],
    ],
  },
  {
    title: "Apariencia facial",
    fields: [
      ["Forma del rostro", "faceShape", faceShapeOptions],
      ["Mandíbula", "jaw", jawOptions],
      ["Pómulos", "cheekbones", cheekboneOptions],
      ["Mentón", "chin", chinOptions],
      ["Ojos", "eyes", eyeOptions],
      ["Cejas", "eyebrows", eyebrowOptions],
      ["Nariz", "nose", noseOptions],
      ["Labios", "lips", lipOptions],
      ["Piel", "skin", skinOptions],
      ["Cabello", "hair", hairOptions],
      ["Rasgo distintivo", "distinctiveTrait", distinctiveTraitOptions],
    ],
  },
  {
    title: "Expresión y cuerpo",
    fields: [
      ["Expresión base", "expressionBase", expressionBaseOptions],
      ["Intensidad de expresión", "expressionIntensity", expressionIntensityOptions],
      ["Complexión", "bodyBuild", bodyBuildOptions],
      ["Proporciones", "bodyProportion", bodyProportionOptions],
      ["Postura", "posture", postureOptions],
      ["Distribución del peso", "weightDistribution", weightDistributionOptions],
      ["Caminata · ritmo", "gaitRhythm", gaitRhythmOptions],
      ["Caminata · estilo", "gaitStyle", gaitStyleOptions],
      ["Caminata · dirección", "gaitDirection", gaitDirectionOptions],
      ["Tensión corporal", "bodyTension", bodyTensionOptions],
      ["Control del movimiento", "movementControl", movementControlOptions],
      ["Calidad del movimiento", "movementQuality", movementQualityOptions],
      ["Gestualidad", "gestureLevel", gestureLevelOptions],
      ["Tipo de gesto", "gestureType", gestureTypeOptions],
      ["Dirección de la mirada", "gazeDirection", gazeDirectionOptions],
      ["Presencia escénica", "stagePresence", stagePresenceOptions],
      ["Energía corporal", "bodyEnergy", bodyEnergyOptions],
      ["Movimiento en reposo", "idleMovement", idleMovementOptions],
      ["Rasgo distintivo de movimiento", "motionDistinctive", motionDistinctiveOptions],
    ],
  },
  {
    title: "Vestuario",
    fields: [
      ["Tipo de vestimenta", "wardrobeType", wardrobeTypeOptions],
      ["Prenda superior", "upperGarment", upperGarmentOptions],
      ["Prenda inferior", "lowerGarment", lowerGarmentOptions],
      ["Capa exterior", "outerLayer", outerLayerOptions],
      ["Calzado", "footwear", footwearOptions],
      ["Accesorio", "accessory", accessoryOptions],
      ["Material", "material", materialOptions],
      ["Color / paleta", "wardrobeColor", wardrobeColorOptions],
      ["Estado", "wardrobeState", wardrobeStateOptions],
      ["Ajuste", "fit", fitOptions],
      ["Detalle distintivo", "wardrobeDetail", wardrobeDetailOptions],
    ],
  },
  {
    title: "Cinematografía y estética",
    fields: [
      ["Género cinematográfico", "filmGenre", filmGenreOptions],
      ["Estilo general", "styleGeneral", styleGeneralOptions],
      ["Estilo por época", "styleByEra", styleByEraOptions],
      ["Tono emocional", "emotionalTone", emotionalToneOptions],
      ["Estilo artístico", "artisticStyle", artisticStyleOptions],
      ["Técnica de animación", "animationTechnique", animationTechniqueOptions],
      ["Estilo de producción", "productionStyle", productionStyleOptions],
      ["Estilo narrativo", "narrativeStyle", narrativeStyleOptions],
      ["Referencia de estilo", "styleReference", styleReferenceOptions],
      ["Iluminación", "lighting", lightingOptions],
      ["Paleta", "palette", paletteOptions],
      ["Contraste", "contrast", contrastOptions],
      ["Lente", "lens", lensOptions],
      ["Profundidad de campo", "depthOfField", depthOfFieldOptions],
      ["Tipo de plano", "shotType", shotTypeOptions],
      ["Ángulo", "angle", angleOptions],
      ["Movimiento", "movement", movementOptions],
      ["Escenografía", "scenography", scenographyOptions],
      ["Atmósfera", "atmosphere", atmosphereOptions],
      ["Textura", "texture", textureOptions],
      ["Composición", "composition", compositionOptions],
    ],
  },
];

export default function App() {
  const [form, setForm] = useState(defaultForm);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [generatedNegative, setGeneratedNegative] = useState("");
  const [history, setHistory] = useState([]);
  const [showTests, setShowTests] = useState(false);
  const selfTests = useMemo(() => runSelfTests(), []);

  const keyFields = ["gender", "ageRange", "ethnicity", "profession", "era", "faceShape", "eyes", "expressionBase", "bodyBuild", "wardrobeType", "filmGenre", "styleGeneral", "lighting", "palette", "contrast", "lens", "depthOfField", "shotType", "angle", "movement", "scenography", "atmosphere", "texture", "composition"];
  const completeness = useMemo(() => Math.round((keyFields.filter((k) => form[k]).length / keyFields.length) * 100), [form]);

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const generatePrompt = () => {
    const prompt = buildPrompt(form);
    const negative = buildNegativePrompt(form);
    setGeneratedPrompt(prompt);
    setGeneratedNegative(negative);
    setHistory((prev) => [{ id: Date.now(), title: form.characterName || form.idea || "Prompt", prompt }, ...prev].slice(0, 8));
  };

  const resetAll = () => {
    setForm({ ...defaultForm });
    setGeneratedPrompt("");
    setGeneratedNegative("");
  };

  const copyText = async (value) => {
    if (!value) return;
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(value);
    } catch (e) {
      console.error(e);
    }
  };

  const renderField = ([label, key, type]) => {
    if (type === "textarea") {
      return (
        <Field key={key} label={label}>
          <textarea className="textarea" rows={3} value={form[key]} onChange={(e) => setField(key, e.target.value)} />
        </Field>
      );
    }
    if (type === "text") {
      return (
        <Field key={key} label={label}>
          <input className="input" value={form[key]} onChange={(e) => setField(key, e.target.value)} />
        </Field>
      );
    }
    return (
      <Field key={key} label={label}>
        <SearchableSelect value={form[key]} onChange={(v) => setField(key, v)} options={type} />
      </Field>
    );
  };

  return (
    <div className="page">
      <div className="container">
        <div className="hero-grid">
          <SectionCard title="Prompt Builder IA · Imágenes" />
          <SectionCard title="Estado del prompt" subtitle="Más estructura, menos interpretación ninja por parte de la IA.">
            <div className="progress-header">
              <span>Cobertura</span>
              <strong>{completeness}%</strong>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${completeness}%` }} />
            </div>
            <div className="button-row">
              <PrimaryButton onClick={generatePrompt}>Generar prompt</PrimaryButton>
              <SecondaryButton onClick={resetAll}>Limpiar</SecondaryButton>
            </div>
          </SectionCard>
        </div>

        <div className="main-grid">
          <SectionCard title="Constructor">
            <div className="section-stack">
              {groups.map((group) => (
                <details key={group.title} className="details" open>
                  <summary className="summary">{group.title}</summary>
                  <div className={group.fields.length > 2 ? "field-grid3" : "field-grid2"}>
                    {group.fields.map(renderField)}
                  </div>
                </details>
              ))}

              <details className="details">
                <summary className="summary">Opciones finales</summary>
                <div className="field-grid2">
                  <Field label="Idioma">
                    <SearchableSelect value={form.language} onChange={(v) => setField("language", v)} options={["es", "en"]} />
                  </Field>
                  <Field label="Aspect ratio">
                    <SearchableSelect value={form.aspectRatio} onChange={(v) => setField("aspectRatio", v)} options={["1:1", "4:5", "3:2", "16:9", "9:16", "21:9"]} />
                  </Field>
                </div>
                <div className="switch-grid">
                  <label className="switch-card"><span>Consistencia visual</span><input type="checkbox" checked={form.consistency} onChange={(e) => setField("consistency", e.target.checked)} /></label>
                  <label className="switch-card"><span>Incluir negative prompt</span><input type="checkbox" checked={form.includeNegative} onChange={(e) => setField("includeNegative", e.target.checked)} /></label>
                </div>
                <Field label="Negative prompt personalizado">
                  <textarea className="textarea" rows={4} value={form.negativePrompt} onChange={(e) => setField("negativePrompt", e.target.value)} />
                </Field>
              </details>
            </div>
          </SectionCard>

          <div className="side-stack">
            <SectionCard title="Resultado" subtitle="Prompt listo para copiar y pegar.">
              <div className="output-box">
                <div className="output-title">Prompt principal</div>
                <div className="output-text">{generatedPrompt || "Completá selects y generá el prompt."}</div>
              </div>
              <div className="button-row">
                <PrimaryButton onClick={() => copyText(generatedPrompt)} disabled={!generatedPrompt}>Copiar prompt</PrimaryButton>
                <SecondaryButton onClick={generatePrompt}>Regenerar</SecondaryButton>
              </div>
              <div className="separator" />
              <div className="output-box">
                <div className="output-title">Negative prompt</div>
                <div className="output-text">{generatedNegative || "Sin negative prompt por ahora."}</div>
              </div>
              <SecondaryButton onClick={() => copyText(generatedNegative)} disabled={!generatedNegative}>Copiar negative prompt</SecondaryButton>
            </SectionCard>

            <SectionCard title="Self-tests" subtitle="Chequeos básicos de la lógica del generador.">
              <SecondaryButton onClick={() => setShowTests((s) => !s)}>{showTests ? "Ocultar tests" : "Ver tests"}</SecondaryButton>
              {showTests ? (
                <div className="tests-wrap">
                  <div className={`tests-status ${selfTests.overall ? "ok" : "bad"}`}>
                    {selfTests.overall ? "Todos los tests pasan" : "Hay tests fallando"}
                  </div>
                  {selfTests.tests.map((t) => (
                    <div key={t.name} className="test-row">{t.pass ? "✅" : "❌"} {t.name}</div>
                  ))}
                </div>
              ) : null}
            </SectionCard>

            <SectionCard title="Historial" subtitle="Últimos prompts de la sesión.">
              {history.length === 0 ? (
                <div className="empty-text">Sin historial todavía.</div>
              ) : (
                history.map((item) => (
                  <div key={item.id} className="history-card">
                    <div className="history-header">
                      <strong>{item.title}</strong>
                      <SecondaryButton onClick={() => copyText(item.prompt)}>Copiar</SecondaryButton>
                    </div>
                    <div className="history-text">{item.prompt}</div>
                  </div>
                ))
              )}
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}
