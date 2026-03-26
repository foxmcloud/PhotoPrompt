import React, { useMemo, useRef, useState, useEffect } from "react";

const generationModes = [
  { id: "personaje", title: "Generar Personaje", subtitle: "Construí identidad, rostro, cuerpo y estilo visual.", emoji: "🧍" },
  { id: "locacion", title: "Generar Locación", subtitle: "Definí ambiente, arquitectura, clima y atmósfera.", emoji: "🏙️" },
  { id: "criatura", title: "Generar Criatura", subtitle: "Diseñá especies, mutaciones, fantasía o sci‑fi.", emoji: "🐉" },
];

const groups = [
  {
    id: "identidad",
    title: "1. Identidad",
    sections: [
      {
        id: "identidad-base",
        title: "Identidad",
        fields: [
          { key: "gender", label: "Género", type: "search", options: ["Masculino", "Femenino", "No binario", "Andrógino", "Indefinido"] },
          { key: "age", label: "Edad", type: "slider", min: 18, max: 80, step: 1, suffix: " años" },
          { key: "ethnicity", label: "Etnicidad", type: "search", options: ["Latinoamericano mestizo", "Europa Occidental", "Árabe", "Chino", "Japonés", "Coreano", "Afrodescendiente", "Multirracial", "Mediterráneo europeo", "Indígena latinoamericano"] },
          { key: "profession", label: "Profesión", type: "search", options: ["Detective", "Cartógrafo clandestino", "Soldado", "Ingeniero", "Médico", "Mercenario", "Hacker", "Explorador", "Piloto", "Artista"] },
          { key: "era", label: "Época", type: "search", options: ["Contemporáneo", "Años 50", "Cyberpunk", "Futuro post-apocalíptico", "Retro futurista", "Edad Media", "Renacimiento"] },
          { key: "socialContext", label: "Contexto cultural / social", type: "textarea", rows: 3 },
        ],
      },
    ],
  },
  {
    id: "rostro",
    title: "2. Rostro — Detalles",
    sections: [
      {
        id: "rostro-estructura",
        title: "Rostro — Estructura",
        fields: [
          { key: "faceShape", label: "Forma del rostro", type: "search", options: ["Angular y alargado", "Ovalado equilibrado", "Cuadrado marcado", "Redondo suave", "Diamante definido"] },
          { key: "jaw", label: "Mandíbula", type: "search", options: ["Marcada, ligeramente asimétrica", "Fuerte y recta", "Angular definida", "Suave y difusa"] },
          { key: "cheekbones", label: "Pómulos", type: "search", options: ["Pronunciados", "Altos y suaves", "Hundidos", "Redondeados"] },
          { key: "chin", label: "Mentón", type: "search", options: ["Firme, con leve desgaste", "Cuadrado fuerte", "Puntiagudo", "Retrasado"] },
        ],
      },
      {
        id: "rostro-rasgos",
        title: "Rostro — Rasgos",
        fields: [
          { key: "eyes", label: "Ojos", type: "search", options: ["Hundidos, mirada penetrante", "Mirada cansada", "Almendrados intensos", "Fríos, calculadores"] },
          { key: "eyebrows", label: "Cejas", type: "search", options: ["Gruesas, desordenadas", "Rectas y gruesas", "Arqueadas definidas", "Cortas y duras"] },
          { key: "nose", label: "Nariz", type: "search", options: ["Recta con antigua fractura", "Aguileña", "Recta clásica", "Ligeramente desviada"] },
          { key: "lips", label: "Labios", type: "search", options: ["Finos, resecos", "Tensos", "Medios equilibrados", "Comisuras caídas"] },
          { key: "skin", label: "Piel", type: "search", options: ["Curtida con polvo y marcas", "Textura realista detallada", "Con cicatrices", "Arrugas finas"] },
          { key: "hair", label: "Cabello", type: "search", options: ["Oscuro, desordenado", "Canoso corto", "Largo y sucio", "Rapado lateral"] },
        ],
      },
      {
        id: "rostro-superficie",
        title: "Superficie y detalle",
        fields: [
          { key: "uniqueTrait", label: "Rasgo único", type: "search", options: ["Implante ocular mecánico", "Cicatriz visible", "Tatuaje simbólico", "Ojo con heterocromía"] },
          { key: "expression", label: "Expresión", type: "search", options: ["Serio y agotado", "Tenso pero contenido", "Frío", "Amenazante"] },
        ],
      },
    ],
  },
  {
    id: "cuerpo",
    title: "3. Expresión y Vestuario",
    sections: [
      {
        id: "cuerpo-presencia",
        title: "Cuerpo y presencia",
        fields: [
          { key: "body", label: "Cuerpo", type: "search", options: ["Robusto", "Atlético", "Delgado", "Pesado / corpulento"] },
          { key: "posture", label: "Postura", type: "search", options: ["Recta (erguida)", "Ligeramente encorvada", "Rígida", "Relajada"] },
          { key: "energy", label: "Energía corporal", type: "search", options: ["Baja", "Media", "Alta"] },
        ],
      },
      {
        id: "vestuario",
        title: "Vestuario",
        fields: [
          { key: "wardrobe", label: "Vestuario", type: "search", options: ["Gabardina táctica desgastada", "Abrigo pesado militar", "Uniforme técnico", "Ropa de superviviente"] },
          { key: "accessory", label: "Accesorio", type: "search", options: ["Mochila de mapas", "Guantes tácticos", "Collar metálico", "Arnés utilitario"] },
        ],
      },
    ],
  },
  {
    id: "cine",
    title: "4. Cine y Escena",
    sections: [
      {
        id: "cine-base",
        title: "Cine",
        fields: [
          { key: "filmGenre", label: "Género cinematográfico", type: "search", options: ["Cine noir", "Thriller", "Drama post-apocalíptico", "Sci-fi oscuro"] },
          { key: "styleGeneral", label: "Estilo general", type: "search", options: ["Cinemático premium", "Realismo sucio", "Noir", "Hiperrealista"] },
          { key: "tone", label: "Tono emocional", type: "search", options: ["Oscuro", "Inquietante", "Melancólico", "Tenso"] },
          { key: "lighting", label: "Iluminación", type: "search", options: ["Low-key", "Luz lateral dura", "Contraluz cinematográfico", "Neblina cálida con humo"] },
          { key: "lens", label: "Lente", type: "search", options: ["50mm", "35mm", "85mm", "Anamórfico"] },
          { key: "shotType", label: "Tipo de plano", type: "search", options: ["Plano medio", "Primer plano", "Plano americano", "Plano detalle"] },
          { key: "angle", label: "Ángulo", type: "search", options: ["Frontal directo", "Tres cuartos", "Contrapicado leve", "Picado suave"] },
          { key: "movement", label: "Movimiento", type: "search", options: ["Cámara estática", "Push-in lento", "Handheld controlado", "Tracking shot"] },
        ],
      },
      {
        id: "escena",
        title: "Escena",
        fields: [
          { key: "scenography", label: "Escenografía", type: "search", options: ["Ciudad colapsada con ruinas", "Callejón industrial", "Interior devastado", "Mercado destruido"] },
          { key: "atmosphere", label: "Atmósfera", type: "search", options: ["Humo y ceniza en suspensión", "Niebla densa", "Aire húmedo", "Partículas flotantes"] },
          { key: "texture", label: "Textura", type: "search", options: ["Film grain fino", "Glow y polvo", "Look celuloide", "Ruido digital leve"] },
          { key: "composition", label: "Composición", type: "search", options: ["Regla de tercios", "Sujeto dominante", "Centrada", "Profunda por capas"] },
        ],
      },
    ],
  },
];

const defaultState = {
  mode: "personaje",
  gender: "Masculino",
  age: 52,
  ethnicity: "Medio oriental",
  profession: "Cartógrafo clandestino",
  era: "Futuro post-apocalíptico",
  socialContext: "Sobrevive en ciudades colapsadas intercambiando mapas de zonas seguras.",
  faceShape: "Angular y alargado",
  jaw: "Marcada, ligeramente asimétrica",
  cheekbones: "Pronunciados",
  chin: "Firme, con leve desgaste",
  eyes: "Hundidos, mirada penetrante",
  eyebrows: "Gruesas, desordenadas",
  nose: "Recta con antigua fractura",
  lips: "Finos, resecos",
  skin: "Curtida con polvo y marcas",
  hair: "Oscuro, desordenado",
  uniqueTrait: "Implante ocular mecánico",
  expression: "Serio y agotado",
  body: "Robusto",
  posture: "Ligeramente encorvada",
  energy: "Media",
  wardrobe: "Gabardina táctica desgastada",
  accessory: "Mochila de mapas",
  filmGenre: "Drama post-apocalíptico",
  styleGeneral: "Realismo sucio",
  tone: "Oscuro",
  lighting: "Low-key",
  lens: "50mm",
  shotType: "Plano medio",
  angle: "Tres cuartos",
  movement: "Cámara estática",
  scenography: "Ciudad colapsada con ruinas",
  atmosphere: "Humo y ceniza en suspensión",
  texture: "Film grain fino",
  composition: "Sujeto dominante",
};

const manualFieldKeys = new Set(["socialContext"]);

function SearchableSelect({ value, options, onChange, placeholder = "Selecciona", allowCustom = false }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const normalizedQuery = (open ? query : "").toLowerCase();
  const baseOptions = ["", ...options];
  const filtered = baseOptions.filter((option) => {
    const label = option || "Vacío";
    return label.toLowerCase().includes(normalizedQuery);
  });
  const optionRefs = useRef([]);

  useEffect(() => {
    if (!open) return;
    const node = optionRefs.current[highlighted];
    if (node?.scrollIntoView) node.scrollIntoView({ block: "nearest" });
  }, [highlighted, open]);

  const commitValue = (nextValue) => {
    onChange(nextValue);
    setOpen(false);
    setQuery("");
  };

  return (
    <div className="relative">
      <input
        value={open ? query : value || ""}
        placeholder={placeholder}
        onFocus={() => {
          setOpen(true);
          setQuery(value || "");
          setHighlighted(0);
        }}
        onBlur={() => {
          window.setTimeout(() => {
            setOpen(false);
            setQuery("");
          }, 140);
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setHighlighted(0);
        }}
        onKeyDown={(e) => {
          if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
            setOpen(true);
            return;
          }
          if (e.key === "Enter") {
            e.preventDefault();
            if (open && filtered.length && highlighted >= 0 && highlighted < filtered.length) {
              commitValue(filtered[highlighted]);
            } else if (allowCustom) {
              commitValue(query.trim());
            }
          }
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlighted((prev) => Math.min(prev + 1, Math.max(filtered.length - 1, 0)));
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlighted((prev) => Math.max(prev - 1, 0));
          }
          if (e.key === "Escape") {
            setOpen(false);
            setQuery("");
          }
        }}
        className="w-full rounded-xl border border-white/12 bg-black/25 px-4 py-3 pr-11 text-sm text-white outline-none transition focus:border-violet-400/70 focus:bg-black/35"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-white/55 transition hover:bg-white/10 hover:text-white"
        >
          ×
        </button>
      ) : null}
      {open ? (
        <div className="absolute z-30 mt-2 max-h-56 w-full overflow-auto rounded-2xl border border-white/12 bg-[#0b0a16]/95 p-1 shadow-2xl backdrop-blur-xl">
          {allowCustom && query.trim() ? (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => commitValue(query.trim())}
              className="block w-full rounded-xl px-3 py-2 text-left text-sm text-cyan-100/85 transition hover:bg-cyan-400/10"
            >
              Usar texto personalizado: {query.trim()}
            </button>
          ) : null}
          {filtered.length > 0 ? (
            filtered.map((option, index) => {
              const displayLabel = option || "Vacío";
              return (
                <button
                  key={`${displayLabel}-${index}`}
                  ref={(node) => (optionRefs.current[index] = node)}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => commitValue(option)}
                  className={`block w-full rounded-xl px-3 py-2 text-left text-sm transition ${highlighted === index ? "bg-violet-500/20 text-white" : "text-white/80 hover:bg-white/5"}`}
                >
                  {displayLabel}
                </button>
              );
            })
          ) : !allowCustom ? (
            <div className="rounded-xl px-3 py-2 text-sm text-white/45">Sin resultados</div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function PromptPreview({ form }) {
  const prompt = useMemo(() => {
    const lines = [
      form.gender && `GÉNERO: ${form.gender}`,
      form.age && `EDAD: ${form.age} años`,
      form.ethnicity && `ETNICIDAD: ${form.ethnicity}`,
      form.profession && `PROFESIÓN: ${form.profession}`,
      form.era && `ÉPOCA: ${form.era}`,
      form.faceShape && `FORMA DEL ROSTRO: ${form.faceShape}`,
      form.jaw && `MANDÍBULA: ${form.jaw}`,
      form.cheekbones && `PÓMULOS: ${form.cheekbones}`,
      form.chin && `MENTÓN: ${form.chin}`,
      form.eyes && `OJOS: ${form.eyes}`,
      form.eyebrows && `CEJAS: ${form.eyebrows}`,
      form.nose && `NARIZ: ${form.nose}`,
      form.lips && `LABIOS: ${form.lips}`,
      form.skin && `PIEL: ${form.skin}`,
      form.hair && `CABELLO: ${form.hair}`,
      form.uniqueTrait && `RASGO ÚNICO: ${form.uniqueTrait}`,
      form.expression && `EXPRESIÓN: ${form.expression}`,
      form.body && `CUERPO: ${[form.body, form.posture, form.energy].filter(Boolean).join(", ")}`,
      form.wardrobe && `VESTUARIO: ${[form.wardrobe, form.accessory].filter(Boolean).join(", ")}`,
      form.filmGenre && `GÉNERO CINEMATOGRÁFICO: ${form.filmGenre}`,
      form.styleGeneral && `ESTILO GENERAL: ${form.styleGeneral}`,
      form.tone && `TONO EMOCIONAL: ${form.tone}`,
      form.lighting && `ILUMINACIÓN: ${form.lighting}`,
      form.lens && `LENTE: ${form.lens}`,
      form.shotType && `TIPO DE PLANO: ${form.shotType}`,
      form.angle && `ÁNGULO: ${form.angle}`,
      form.movement && `MOVIMIENTO: ${form.movement}`,
      form.scenography && `ESCENOGRAFÍA: ${form.scenography}`,
      form.atmosphere && `ATMÓSFERA: ${form.atmosphere}`,
      form.texture && `TEXTURA: ${form.texture}`,
      form.composition && `COMPOSICIÓN: ${form.composition}`,
    ].filter(Boolean);
    return lines.join("\n");
  }, [form]);

  const json = useMemo(() => JSON.stringify(form, null, 2), [form]);
  const summary = `${form.profession || "Personaje"} de ${form.age} años, ${form.ethnicity?.toLowerCase() || "origen indefinido"}, en ${form.era?.toLowerCase() || "una era indefinida"}. ${form.faceShape || "Rostro definido"}, ${form.uniqueTrait?.toLowerCase() || "sin rasgo único"}, ${form.wardrobe?.toLowerCase() || "vestuario base"}.`;

  return { prompt, json, summary };
}

export default function PhotoPromptBuilderV2() {
  const [state, setState] = useState(defaultState);
  const [activeMainTab, setActiveMainTab] = useState("identidad");
  const [activePreviewTab, setActivePreviewTab] = useState("prompt");
  const [expandedSections, setExpandedSections] = useState(() => new Set(["identidad-base", "rostro-estructura", "cine-base"]));
  const { prompt, json, summary } = PromptPreview({ form: state });

  const currentGroup = groups.find((group) => group.id === activeMainTab) || groups[0];

  const toggleSection = (id) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const setField = (key, value) => setState((prev) => ({ ...prev, [key]: value }));

  const clearAll = () => {
    setState({
      ...defaultState,
      mode: state.mode,
      age: defaultState.age,
      gender: "",
      ethnicity: "",
      profession: "",
      era: "",
      socialContext: "",
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
      uniqueTrait: "",
      expression: "",
      body: "",
      posture: "",
      energy: "",
      wardrobe: "",
      accessory: "",
      filmGenre: "",
      styleGeneral: "",
      tone: "",
      lighting: "",
      lens: "",
      shotType: "",
      angle: "",
      movement: "",
      scenography: "",
      atmosphere: "",
      texture: "",
      composition: "",
    });
  };

  const randomizeSection = (section) => {
    setState((prev) => {
      const next = { ...prev };
      section.fields.forEach((field) => {
        if (field.type === "search" && Array.isArray(field.options) && field.options.length) {
          const randomIndex = Math.floor(Math.random() * (field.options.length + 1));
          next[field.key] = randomIndex === field.options.length ? "" : field.options[randomIndex];
        }
        if (field.type === "slider") {
          const min = field.min ?? 0;
          const max = field.max ?? 100;
          const step = field.step ?? 1;
          const totalSteps = Math.floor((max - min) / step);
          next[field.key] = min + Math.floor(Math.random() * (totalSteps + 1)) * step;
        }
      });
      return next;
    });
  };

  const copy = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#05050a] text-white">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(95,82,255,0.16),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(129,76,255,0.12),_transparent_24%),linear-gradient(180deg,#07070d_0%,#0b0a16_100%)] px-4 py-5 md:px-8">
        <div className="mx-auto max-w-[1600px] rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,19,36,0.96),rgba(9,10,18,0.98))] shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <header className="flex items-center justify-between border-b border-white/8 px-6 py-5 md:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl font-bold tracking-tight text-white shadow-[0_0_40px_rgba(121,90,255,0.18)]">AI</div>
              <div>
                <div className="text-xl font-semibold tracking-wide text-white/95">AI Character Builder</div>
                <div className="text-sm text-white/45">Interfaz visual para prompts profesionales de imagen</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400" />
                Mimi
              </div>
              <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/70">◌</button>
            </div>
          </header>

          <div className="space-y-5 p-5 md:p-6">
            <section className="rounded-[22px] border border-white/8 bg-white/[0.02] p-4 md:p-5">
              <h2 className="mb-4 text-2xl font-light tracking-wide text-white/90">Seleccionar Tipo de Generación</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {generationModes.map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setState((prev) => ({ ...prev, mode: mode.id }))}
                    className={`relative overflow-hidden rounded-[24px] border px-5 py-5 text-left transition ${state.mode === mode.id ? "border-violet-400/60 bg-violet-500/10 shadow-[0_0_0_1px_rgba(168,139,250,0.25),0_18px_40px_rgba(88,28,135,0.22)]" : "border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05]"}`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_35%)]" />
                    <div className="relative">
                      <div className="mb-10 h-28 rounded-2xl border border-white/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
                      <div className="flex items-center gap-3 text-2xl font-medium">
                        <span>{mode.emoji}</span>
                        <span>{mode.title}</span>
                      </div>
                      <p className="mt-2 text-sm text-white/55">{mode.subtitle}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <div className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)_420px]">
              <aside className="space-y-4">
                <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-3">
                  <div className="space-y-2">
                    {groups.map((group) => (
                      <button
                        key={group.id}
                        type="button"
                        onClick={() => setActiveMainTab(group.id)}
                        className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${activeMainTab === group.id ? "bg-gradient-to-r from-violet-500/30 to-fuchsia-500/12 text-white shadow-[inset_0_0_0_1px_rgba(196,181,253,0.2)]" : "bg-transparent text-white/70 hover:bg-white/[0.04] hover:text-white"}`}
                      >
                        <span className="font-medium tracking-wide">{group.title}</span>
                        <span className="text-white/35">•••</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-3">
                  <div className="mb-2 rounded-2xl bg-violet-500/20 px-4 py-3 text-base font-medium text-white shadow-[inset_0_0_0_1px_rgba(196,181,253,0.2)]">{currentGroup.title}</div>
                  <div className="space-y-2">
                    {currentGroup.sections.map((section) => (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => toggleSection(section.id)}
                        className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-white/80 transition hover:bg-white/[0.04] hover:text-white"
                      >
                        <span>{section.title}</span>
                        <span className="text-white/45">{expandedSections.has(section.id) ? "−" : "+"}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm uppercase tracking-[0.24em] text-white/35">Prompt general</div>
                    <button
                      type="button"
                      onClick={clearAll}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/65 transition hover:bg-rose-500/15 hover:text-white"
                    >
                      Limpiar todo
                    </button>
                  </div>
                  <div className="mt-3 text-sm leading-7 text-white/70">{summary}</div>
                </div>
              </aside>

              <main className="space-y-4">
                {currentGroup.sections.map((section) => {
                  const open = expandedSections.has(section.id);
                  return (
                    <section key={section.id} className="overflow-hidden rounded-[24px] border border-white/8 bg-white/[0.03]">
                      <div className="flex items-center justify-between px-5 py-4 text-left">
                        <button
                          type="button"
                          onClick={() => toggleSection(section.id)}
                          className="flex min-w-0 flex-1 items-center justify-between text-left"
                        >
                          <div>
                            <div className="text-xl font-medium tracking-wide text-white/90">{section.title}</div>
                            <div className="mt-1 text-sm text-white/40">{section.fields.length} criterios editables</div>
                          </div>
                          <div className="ml-4 text-white/35">•••</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => randomizeSection(section)}
                          className="ml-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-white/65 transition hover:bg-violet-500/15 hover:text-white"
                        >
                          Random
                        </button>
                      </div>
                      {open ? (
                        <div className="grid gap-4 border-t border-white/8 px-5 py-5 md:grid-cols-2">
                          {section.fields.map((field) => (
                            <div key={field.key} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                              <label className="mb-2 block text-sm font-medium uppercase tracking-[0.18em] text-white/55">{field.label}</label>
                              {field.type === "search" ? (
                                <SearchableSelect
                                  value={state[field.key] || ""}
                                  options={field.options}
                                  onChange={(value) => setField(field.key, value)}
                                  allowCustom={manualFieldKeys.has(field.key)}
                                />
                              ) : field.type === "slider" ? (
                                <div className="rounded-2xl border border-white/12 bg-black/20 px-4 py-4">
                                  <div className="mb-3 flex items-center justify-between text-sm text-white/80">
                                    <span>{field.min}</span>
                                    <span className="text-base font-medium">{state[field.key]}{field.suffix || ""}</span>
                                    <span>{field.max}</span>
                                  </div>
                                  <input
                                    type="range"
                                    min={field.min}
                                    max={field.max}
                                    step={field.step}
                                    value={state[field.key]}
                                    onChange={(e) => setField(field.key, Number(e.target.value))}
                                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-violet-400"
                                  />
                                </div>
                              ) : (
                                <textarea
                                  rows={field.rows || 4}
                                  value={state[field.key] || ""}
                                  onChange={(e) => setField(field.key, e.target.value)}
                                  className="w-full rounded-2xl border border-white/12 bg-black/25 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400/70 focus:bg-black/35"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </section>
                  );
                })}
              </main>

              <aside className="space-y-4">
                <section className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="text-2xl font-light tracking-wide text-white/90">Vista Previa</div>
                    <div className="text-white/30">•••</div>
                  </div>
                  <div className="mb-4 flex gap-2 rounded-2xl border border-white/8 bg-black/20 p-1">
                    {[["prompt", "Prompt"], ["json", "JSON"]].map(([id, label]) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setActivePreviewTab(id)}
                        className={`rounded-xl px-4 py-2 text-sm transition ${activePreviewTab === id ? "bg-violet-600/70 text-white shadow-[inset_0_0_0_1px_rgba(196,181,253,0.18)]" : "text-white/55 hover:bg-white/[0.04] hover:text-white/85"}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  <div className="overflow-hidden rounded-[22px] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(255,196,137,0.16),transparent_28%),linear-gradient(180deg,#201811_0%,#0d0f18_100%)]">
                    {activePreviewTab === "prompt" ? (
                      <pre className="max-h-[520px] overflow-auto whitespace-pre-wrap p-5 text-sm leading-7 text-white/78">{prompt}</pre>
                    ) : (
                      <pre className="max-h-[520px] overflow-auto whitespace-pre-wrap p-5 text-xs leading-6 text-cyan-100/80">{json}</pre>
                    )}
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <button className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-base font-medium transition hover:bg-white/[0.08]">⟳ Regenerar</button>
                    <button onClick={() => copy(activePreviewTab === "json" ? json : prompt)} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-base font-medium transition hover:bg-white/[0.08]">📄 Copiar</button>
                    <button className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-base font-medium transition hover:bg-white/[0.08] sm:col-span-2">⚙ Guardar Preset</button>
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
