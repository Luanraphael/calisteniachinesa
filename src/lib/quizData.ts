import { Wind, HeartPulse, ShieldCheck, Sparkles, Flame } from "lucide-react";
import type { Answers, ImageSlot, QuizStep } from "./quizTypes";

export const BRAND_NAME = "Instituto Lian";

const P = "/images/quiz";

function img(key: string, variant: ImageSlot["variant"], alt: string, src?: string): ImageSlot {
  return { key, variant, alt, src };
}

/** The lead's first-person-captured name, trimmed — empty string when not yet answered. */
function leadNameOf(a: Answers): string {
  return typeof a.leadName === "string" ? a.leadName.trim() : "";
}

const BIOTYPES: Record<string, { name: string; body: string; image: ImageSlot }> = {
  "gain-easy": {
    name: "Endomorfo",
    body: "Seu corpo acumula gordura com facilidade, principalmente na barriga. Isso não é falta de disciplina. É biologia. A Calistenia Chinesa acelera seu metabolismo lento e ativa a queima da gordura teimosa que você não consegue eliminar.",
    image: img("biotype-endomorfo", "portrait", "Mulher com biotipo endomorfo, pose serena", `${P}/biotype-endomorfo.png`),
  },
  "hard-gain": {
    name: "Ectomorfo",
    body: "Seu corpo tem dificuldade em ganhar peso e massa muscular, mesmo se esforçando. Isso não é falta de esforço. É biologia. A Calistenia Chinesa ativa grupos musculares profundos para tonificar e fortalecer o corpo que você tem tanta dificuldade em desenvolver.",
    image: img("biotype-ectomorfo", "portrait", "Mulher com biotipo ectomorfo, pose serena", `${P}/biotype-ectomorfo.png`),
  },
  fluctuates: {
    name: "Mesomorfo",
    body: "Seu corpo responde rápido às mudanças, para o bem e para o mal: ganha e perde peso com facilidade. Isso não é falta de constância. É biologia. A Calistenia Chinesa cria a rotina estável que aproveita essa resposta rápida do seu corpo a favor de resultados duradouros.",
    image: img("biotype-mesomorfo", "portrait", "Mulher com biotipo mesomorfo, pose serena", `${P}/biotype-mesomorfo.png`),
  },
};

function biotypeFor(a: Answers) {
  return BIOTYPES[(a.weightPattern as string) ?? "gain-easy"] ?? BIOTYPES["gain-easy"];
}

export const quizSteps: QuizStep[] = [
  // 0 — Landing / age gate (mirrors the reference's opening screen 1:1)
  {
    id: "landing",
    type: "landing",
    showProgress: false,
    titleLine1Prefix: "PROGRAMA DE",
    titleLine1: "CALISTENIA CHINESA",
    titleLine2: "PARA MULHERES",
    subheadline: "TESTE DE 1 MINUTO",
    image: img("landing-hero", "full", "Mulher praticando Calistenia Chinesa em uma cadeira", `${P}/landing-hero.png`),
    hint: "Comece agora 👇",
    hintCaption: "De acordo com a sua idade",
    answerKey: "ageRange",
    options: [
      { id: "30-39", label: "30 ~ 39 anos" },
      { id: "40-49", label: "40 ~ 49 anos" },
      { id: "50-59", label: "50 ~ 59 anos" },
      { id: "60+", label: "+ 60 anos" },
    ],
  },
  // 1 — Welcome
  {
    id: "welcome",
    type: "welcome",
    image: img("welcome-hero", "full", "Mulher em pose de calistenia chinesa, meditativa e serena", `${P}/welcome-hero.png`),
    headline: "Bem-vinda à academia de **CALISTENIA CHINESA**",
    center: true,
    body: "Descubra a técnica chinesa milenar criada especialmente para mulheres acima dos 40 que desejam ##Eliminar a barriga pochete##, ##tonificar o abdômen##, perder gordura localizada e acabar com as dores, Com treinos leves e suaves de apenas ##10 Minutos##.",
    ctaLabel: "COMEÇAR",
  },
  // 2 — Goal (hero image + 4 icon-illustrated options)
  {
    id: "goal",
    type: "choice",
    imageList: true,
    image: {
      key: "goal-hero-emblem",
      variant: "natural",
      alt: "Ícone de alvo representando o objetivo do treino",
      src: `${P}/goal-hero-emblem.png`,
      naturalWidth: 1341,
      naturalHeight: 702,
    },
    imageAboveHeadline: true,
    headline: "Qual objetivo é mais importante **pra você agora**?",
    answerKey: "goal",
    options: [
      { id: "define", label: "Emagrecer sem sofrimento", image: { key: "goal-weight", alt: "Emagrecer sem sofrimento", src: `${P}/goal-weight.png` } },
      { id: "strength", label: "Ganhar força e tonificar o corpo", image: { key: "goal-strength", alt: "Ganhar força e tonificar o corpo", src: `${P}/goal-strength.png` } },
      { id: "pain", label: "Aliviar dores e recuperar mobilidade", image: { key: "goal-pain", alt: "Aliviar dores e recuperar mobilidade", src: `${P}/goal-pain.png` } },
      { id: "health", label: "Melhorar minha saúde, energia e disposição", image: { key: "goal-health", alt: "Melhorar minha saúde, energia e disposição", src: `${P}/goal-health.png` } },
    ],
  },
  // 3 — Validation / education (real reference image, yellow insight card)
  {
    id: "validation",
    type: "info",
    center: true,
    image: img("validation-hero", "full", "Mulher alongando o corpo em uma cadeira", `${P}/validation-hero.png`),
    headline: "Você achou a ++solução certa++!",
    calloutStyle: "yellow",
    calloutEmoji: "👉",
    calloutBody:
      "Depois dos 40, o corpo da mulher muda, e isso é natural. O !!estrogênio!! oscila e, com o tempo, diminui. Essas mudanças favorecem o !!acúmulo de gordura na barriga!!, afetam o sono e a disposição, e vêm acompanhadas de !!dores musculares e articulares!!, tornando mais difícil manter uma rotina de exercícios intensos.",
    realImage: { src: "/images/producao-estrogenio-idade.png", alt: "Produção de estrogênio por idade" },
    subheadline2: "E quando isso acontece:",
    bullets: [
      { text: "A gordura se acumula em excesso", tone: "danger" },
      { text: "A energia e disposição diminui", tone: "danger" },
      { text: "A autoestima diminui", tone: "danger" },
      { text: "Os movimentos ficam limitados", tone: "danger" },
      { text: "As dores aparecem", tone: "danger" },
      { text: "E o cansaço vira constante", tone: "danger" },
    ],
    ctaLabel: "Quero cuidar do meu corpo",
  },
  // 4 — Experience (persona LEFT, options RIGHT — ref 193157)
  {
    id: "experience",
    type: "choice",
    sideImage: { key: "experience-side", variant: "side", alt: "Mulher alongando os braços acima da cabeça", src: `${P}/experience-side.png`, position: "left", figureWidthPct: 38 },
    headline: "Você conhece a **CALISTENIA CHINESA**?",
    answerKey: "experience",
    options: [
      { id: "yes", label: "Sim, já experimentei" },
      { id: "heard", label: "Já ouvi falar" },
      { id: "no", label: "Nunca fiz, mas tenho interesse" },
    ],
  },
  // 5 — Education
  {
    id: "explain",
    type: "info",
    image: img("explain-hero", "full", "Mulher de pé ao lado de uma cadeira, pronta para treinar", `${P}/explain-hero.png`),
    headline: "A calistenia Chinesa não é um **treino comum**!",
    center: true,
    body: "A calistenia Chinesa é uma prática milenar que estimula o corpo de forma inteligente e efetiva usando apenas o peso do seu corpo e uma cadeira. Sem necessidade de força em excesso e de treinos longos que lesionam no longo prazo.",
    ctaLabel: "EU QUERO TUDO ISSO",
  },
  // 6 — Body type (image grid)
  {
    id: "bodyType",
    type: "choice",
    imageGrid: true,
    headline: "Qual é o seu **tipo de corpo** atual?",
    answerKey: "bodyType",
    options: [
      { id: "normal", label: "Normal", image: { key: "bodytype-normal", alt: "Corpo normal", src: `${P}/bodytype-normal.png` } },
      { id: "skinnyfat", label: "Falso magro", image: { key: "bodytype-skinnyfat", alt: "Corpo falso magro", src: `${P}/bodytype-skinnyfat.png` } },
      { id: "overweight", label: "Acima do peso", image: { key: "bodytype-overweight", alt: "Corpo acima do peso", src: `${P}/bodytype-overweight.png` } },
    ],
  },
  // 7 — Multi-select discomforts (emoji preserved from the reference)
  {
    id: "discomforts",
    type: "choice",
    headline: "O que mais **incomoda** você hoje?",
    subheadline: "Marque todas que se aplicam",
    answerKey: "discomforts",
    multi: true,
    ctaLabel: "Continuar",
    options: [
      { id: "weight", label: "Estou acima do peso há bastante tempo", emoji: "⚖️" },
      { id: "stiff", label: "Meu corpo vive dolorido e travado", emoji: "🤕" },
      { id: "tired", label: "Vivo cansada e sem energia", emoji: "🥱" },
      { id: "selfesteem", label: "Minha autoestima não é mais a mesma", emoji: "💔" },
      { id: "irritated", label: "Vivo tensa, irritada e sem paciência", emoji: "😤" },
      { id: "sleep", label: "Durmo muito mal", emoji: "😴" },
      { id: "none", label: "Nenhuma das opções acima", neutral: true, exclusive: true },
    ],
  },
  // 8 — Last proud (persona LEFT, options RIGHT — ref 193211)
  {
    id: "lastProud",
    type: "choice",
    sideImage: { key: "lastproud-side", variant: "side", alt: "Mulher sorrindo, confiante com o próprio corpo", src: `${P}/lastproud-side.png`, position: "left", figureWidthPct: 38 },
    headline: "Quando foi a última vez que sentiu **orgulho** do seu corpo?",
    answerKey: "lastProud",
    options: [
      { id: "1y", label: "Menos de um ano atrás" },
      { id: "1-3y", label: "1-3 anos atrás" },
      { id: "3y+", label: "Mais de 3 anos" },
      { id: "cant", label: "Nem me lembro" },
    ],
  },
  // 9 — Flexibility (persona LEFT, options RIGHT — ref 193225)
  {
    id: "flexibility",
    type: "choice",
    sideImage: { key: "flexibility-side", variant: "side", alt: "Mulher sentada alongando a perna em uma cadeira", src: `${P}/flexibility-side.png`, position: "left", figureWidthPct: 38 },
    headline: "Qual é o seu nível de **flexibilidade**?",
    answerKey: "flexibility",
    options: [
      { id: "very", label: "Muito flexível" },
      { id: "a-bit", label: "Um pouco flexível" },
      { id: "none", label: "Nada flexível" },
      { id: "unsure", label: "Não tenho certeza" },
    ],
  },
  // 10 — Body areas multi (image grid)
  {
    id: "focusArea",
    type: "choice",
    imageGrid: true,
    headline: "Quais áreas do corpo você mais gostaria de **ver mudanças**?",
    subheadline: "Pode selecionar quantas quiser.",
    answerKey: "focusArea",
    multi: true,
    ctaLabel: "Continuar",
    options: [
      { id: "belly", label: "Barriga grande", image: { key: "focus-belly", alt: "Barriga grande", src: `${P}/focus-belly.png` } },
      { id: "arms", label: "Braços flácidos", image: { key: "focus-arms", alt: "Braços flácidos", src: `${P}/focus-arms.png` } },
      { id: "butt", label: "Bumbum caído", image: { key: "focus-butt", alt: "Bumbum caído", src: `${P}/focus-butt.png` } },
      { id: "legs", label: "Coxas e pernas flácidas", image: { key: "focus-legs", alt: "Coxas e pernas flácidas", src: `${P}/focus-legs.png` } },
      { id: "posture", label: "Postura curvada / ombros caídos", image: { key: "focus-posture", alt: "Postura curvada", src: `${P}/focus-posture.png` } },
      { id: "full", label: "Quero cuidar do corpo todo", image: { key: "focus-full", alt: "Corpo todo", src: `${P}/focus-full.png` } },
    ],
  },
  // 11 — Value prop (dynamic, laptop+phone video mockup)
  {
    id: "valueProp",
    type: "info",
    image: img("valueprop-mockup", "mockup", "Prévia das aulas em vídeo no notebook e no celular", `${P}/valueprop-mockup.png`),
    headline: (a: Answers) => valuePropHeadline(a),
    body: (a: Answers) =>
      `Eu gravei aulas em vídeo para você saber exatamente o que fazer. Seu treino será focado em ${focusAreaLabel(
        a
      )}, respeitando seu ritmo e seu corpo.`,
    ctaLabel: "Criar meu treino personalizado",
  },
  // 12 — Daily activity (no image, matches the reference)
  {
    id: "activityLevel",
    type: "choice",
    headline: "Como você descreveria um **dia normal** seu?",
    subheadline: "80% das nossas alunas começaram totalmente sedentárias e hoje estão mais fortes, mais leves e cheias de energia.",
    answerKey: "activityLevel",
    options: [
      { id: "still", label: "Fico a maior parte do tempo parada" },
      { id: "little", label: "Me movimento um pouco" },
      { id: "active", label: "Sou ativa na maior parte do tempo" },
    ],
  },
  // 13 — Neck stiffness
  {
    id: "neckStiffness",
    type: "choice",
    image: img("neck-hero", "full", "Mulher virando o pescoço suavemente", `${P}/neck-hero.png`),
    headline: "Você sente **dificuldade ou rigidez** ao virar o pescoço de um lado para o outro?",
    answerKey: "neckStiffness",
    options: [
      { id: "no", label: "Não" },
      { id: "yes", label: "Sim" },
    ],
  },
  // 14 — Stairs
  {
    id: "stairs",
    type: "choice",
    image: img("stairs-hero", "full", "Mulher subindo uma escada em casa", `${P}/stairs-hero.png`),
    headline: "Como você se sente após **subir um lance de escadas**?",
    answerKey: "stairs",
    options: [
      { id: "cant", label: "Não consigo subir" },
      { id: "breathless", label: "Fico sem fôlego e bem cansada" },
      { id: "light", label: "Sinto um leve cansaço" },
      { id: "easy", label: "Subo com tranquilidade" },
    ],
  },
  // 15 — Arms 20s
  {
    id: "arms20",
    type: "choice",
    image: img("arms-hero", "full", "Mulher com os braços estendidos na sala de estar", `${P}/arms-hero.png`),
    headline: "E você aguenta **estender os braços** por 20 segundos?",
    answerKey: "arms20",
    options: [
      { id: "yes", label: "Sim" },
      { id: "no", label: "Não" },
    ],
  },
  // 17 — Weight pattern
  {
    id: "weightPattern",
    type: "choice",
    headline: "Como seu **peso** costuma mudar?",
    answerKey: "weightPattern",
    options: [
      { id: "gain-easy", label: "Engordo com facilidade, mas tenho dificuldade para emagrecer" },
      { id: "fluctuates", label: "Meu peso sobe e desce com facilidade" },
      { id: "hard-gain", label: "Tenho dificuldade em ganhar peso ou músculos" },
    ],
  },
  // 18 — Biotype reveal (text first, real endomorfo photo below)
  {
    id: "biotype",
    type: "info",
    center: true,
    headlineSize: "lg",
    imagePosition: "bottom",
    image: (a: Answers) => biotypeFor(a).image,
    headline: (a: Answers) => `Parece que o seu biotipo é:\n**${biotypeFor(a).name}**`,
    body: (a: Answers) => biotypeFor(a).body,
    ctaLabel: "Continuar",
  },
  // 19 — Injury areas (options LEFT, persona RIGHT — ref 193241, reversed)
  {
    id: "injuries",
    type: "choice",
    sideImage: { key: "injuries-side", variant: "side", alt: "Mulher com a mão no ombro, sentada em uma cadeira", src: `${P}/injuries-side.png`, position: "right", figureWidthPct: 38 },
    headline: "Você sente **dificuldade ou desconforto** em alguma destas áreas?",
    subheadline: "Vamos proteger as áreas lesionadas e, ao mesmo tempo, criar um plano para restaurar seu corpo.",
    answerKey: "injuries",
    multi: true,
    ctaLabel: "Continuar",
    options: [
      { id: "back", label: "Costas/lombar" },
      { id: "knees", label: "Joelhos/pernas" },
      { id: "none", label: "Nenhuma dessas" },
    ],
  },
  // 20 — Benefits (hero image + colored dot bullets)
  {
    id: "benefits",
    type: "benefits",
    image: img("benefits-hero", "mockup", "Mulher em movimento de calistenia com pontos de energia destacados", `${P}/benefits-hero-real.png`),
    headline: "A calistenia restaura seu corpo com **agilidade e precisão**.",
    subheadline: "Com apenas 7 minutos por dia, sem esforço e sem sair de casa.",
    ctaLabel: "Continuar",
    items: [
      { icon: Wind, color: "#2f6fb0", bg: "#eaf2fb", title: "Alivia tensões", text: "nas costas, no pescoço e nas articulações" },
      { icon: HeartPulse, color: "#d1445a", bg: "#fdecef", title: "Devolve mobilidade e flexibilidade", text: "sem forçar o corpo" },
      { icon: ShieldCheck, color: "#6d5a9e", bg: "#f0edf9", title: "Fortalece o corpo", text: "com movimentos suaves e controlados" },
      { icon: Sparkles, color: "#1f9d6d", bg: "#e6f6ef", title: "Acalma o sistema nervoso", text: "e reduz estresse e ansiedade" },
      { icon: Flame, color: "#c9932e", bg: "#fbf1de", title: "Estimula a queima de gordura", text: "sem dietas extremas ou treinos pesados" },
    ],
  },
  // 21 — Intensity preference
  {
    id: "intensityPref",
    type: "choice",
    headline: "Como você prefere **começar** seu treino?",
    subheadline: "Você pode mudar isso depois.",
    answerKey: "intensity",
    options: [
      { id: "light", label: "Leve e tranquilo" },
      { id: "mid", label: "Intermediário" },
      { id: "active", label: "Mais ativo" },
      { id: "decide", label: "Prefiro que vocês decidam", emoji: "💪" },
    ],
  },
  // 22 — Intensity confirm + 2x2 real-photo roadmap
  {
    id: "roadmap",
    type: "roadmap",
    headline: (a: Answers) => `Ótimo, a intensidade do seu treino será:\n++${intensityLabel(a)}++`,
    body: "Você começará com treinos adaptados ao seu nível atual, mas com progressão RÁPIDA e NATURAL.",
    ctaLabel: "Continuar",
    phases: [
      { range: "SEMANA 1-2", text: "Corpo começa a despertar. Postura, respiração e energia começam a melhorar.", color: "#d1445a", image: img("roadmap-1", "side", "Semana 1-2: corpo despertando", `${P}/roadmap-1.png`) },
      { range: "SEMANA 3-4", text: "Dores e rigidez começam a ceder. Você sente mais disposição no dia a dia.", color: "#c9932e", image: img("roadmap-2", "side", "Semana 3-4: menos dores", `${P}/roadmap-2.png`) },
      { range: "SEMANA 5-6", text: "Barriga começa a reduzir, corpo fica mais firme. Roupas começam a servir melhor.", color: "#2f6fb0", image: img("roadmap-3", "side", "Semana 5-6: corpo mais firme", `${P}/roadmap-3.png`) },
      { range: "SEMANA 7-8", text: "Corpo definido, energia consistente e confiança em alta. Você não se reconhece.", color: "#1f9d6d", image: img("roadmap-4", "side", "Semana 7-8: corpo definido", `${P}/roadmap-4.png`) },
    ],
  },
  // 23 — Duration
  {
    id: "duration",
    type: "choice",
    headline: "Qual **duração** se encaixa melhor na sua rotina?",
    answerKey: "duration",
    options: [
      { id: "7", label: "7 minutos", emoji: "⏰" },
      { id: "14", label: "14 minutos", emoji: "⏰" },
      { id: "21", label: "21 minutos", emoji: "⏰" },
      { id: "decide", label: "Prefiro que vocês decidam", emoji: "🏆" },
    ],
  },
  // 24 — No suffering (single pre-made graphic — headline is baked into the image)
  {
    id: "noSuffering",
    type: "info",
    fullGraphic: { src: `${P}/no-suffering-full.png`, alt: "Você não precisa sofrer para ter resultados! Comparação de agachamento com e sem sobrecarga" },
    headline: "Você não precisa **sofrer** para ter resultados!",
    body: "**Exercícios de alto impacto** esgotam sua energia e podem causar **lesões** à medida que envelhecemos. Nosso plano de Calistenia Chinesa segue um caminho diferente:",
    bullets: [
      { text: "Não precisa de equipamentos", tone: "neutral" },
      { text: "Perfeito para quem não gosta de sofrer desgastando o corpo", tone: "neutral" },
      { text: "Apoia a recuperação, não o excesso de treinamento", tone: "neutral" },
    ],
    ctaLabel: "Continuar",
  },
  // 25 — Transition
  {
    id: "transition",
    type: "info",
    image: img("transition-hero", "full", "Mulher em pose meditativa cercada de plantas", `${P}/transition-hero.png`),
    headline: "Vamos traçar o **caminho** até o seu objetivo?",
    body: "Para criar um treino realmente adequado ao seu perfil e liberar recursos exclusivos do aplicativo, precisamos conhecer um pouco mais sobre você.",
    calloutEmoji: "👇",
    citation: "Últimas perguntas, seu treino está quase pronto 👇",
    ctaLabel: "Vamos lá",
  },
  // 26 — Height slider
  {
    id: "height",
    type: "slider",
    headline: "Qual é a sua **altura**?",
    helper: "☝️ **Calculando seu IMC...**\n\nSua altura nos ajuda a adaptar os movimentos à estrutura e amplitude do seu corpo.",
    answerKey: "heightCm",
    min: 140,
    max: 200,
    default: 162,
    unit: "cm",
    ctaLabel: "Próximo passo",
  },
  // 27 — Current weight
  {
    id: "currentWeight",
    type: "slider",
    headline: "Qual é o seu **peso atual**?",
    answerKey: "currentWeightKg",
    min: 40,
    max: 150,
    default: 68,
    unit: "kg",
    ctaLabel: "Próximo passo",
  },
  // 28 — Target weight
  {
    id: "targetWeight",
    type: "slider",
    headline: "E qual **peso** você quer chegar?",
    answerKey: "targetWeightKg",
    min: 40,
    max: 150,
    default: 60,
    unit: "kg",
    ctaLabel: "Próximo passo",
  },
  // 28b — Lead's name
  {
    id: "leadName",
    type: "textInput",
    headline: "Qual é o seu nome?",
    answerKey: "leadName",
    placeholder: "Digite seu nome",
    ctaLabel: "Continuar",
  },
  // 28c — Lead's age
  {
    id: "leadAge",
    type: "textInput",
    headline: "Qual é a sua idade?",
    answerKey: "leadAge",
    placeholder: "Digite sua idade",
    inputMode: "numeric",
    maxLength: 2,
    infoBlock: {
      title: "Perguntamos sua idade para personalizar seu plano",
      text: "As pessoas mais velhas têm um percentual de gordura corporal mais alto do que as pessoas mais jovens com o mesmo IMC.",
    },
    ctaLabel: "Continuar",
  },
  // 29 — Desired body (6 options, image grid)
  {
    id: "desiredBody",
    type: "choice",
    imageGrid: true,
    headline: (a: Answers) => {
      const name = leadNameOf(a);
      return name ? `E agora, ${name}, qual corpo você **gostaria de ter**?` : "Qual corpo você **gostaria de ter**?";
    },
    answerKey: "desiredBody",
    multi: false,
    options: [
      { id: "lean", label: "Mais magra e leve", image: { key: "desired-1", alt: "Mais magra e leve", src: `${P}/desired-1.png` } },
      { id: "flatBelly", label: "Barriga chapada + cintura marcada", image: { key: "desired-2", alt: "Barriga chapada", src: `${P}/desired-2.png` } },
      { id: "toned", label: "Corpo firme e definido", image: { key: "desired-3", alt: "Corpo firme e definido", src: `${P}/desired-3.png` } },
      { id: "curves", label: "Cintura fina + curvas marcadas", image: { key: "desired-4", alt: "Cintura fina e curvas", src: `${P}/desired-4.png` } },
      { id: "glutes", label: "Bumbum empinado + pernas firmes", image: { key: "desired-5", alt: "Bumbum empinado", src: `${P}/desired-5.png` } },
      { id: "full", label: "Transformar o corpo todo", image: { key: "desired-6", alt: "Transformar o corpo todo", src: `${P}/desired-6.png` } },
    ],
  },
  // 30 — Loading (donut, saving answers)
  {
    id: "savingAnswers",
    type: "loading",
    variant: "donut",
    headline: "Salvando suas respostas…",
    durationMs: 2200,
  },
  // 31 — Fat food frequency
  {
    id: "foodFrequency",
    type: "choice",
    headline: "Com que frequência você ingere **alimentos gordurosos**?",
    answerKey: "foodFrequency",
    options: [
      { id: "avoid", label: "Eu geralmente evito", emoji: "😎" },
      { id: "sometimes", label: "3 - 5 vezes por semana", emoji: "🍔" },
      { id: "often", label: "Quase todos os dias", emoji: "🤤" },
    ],
  },
  // 33 — Energy level
  {
    id: "energyLevel",
    type: "choice",
    headline: "Como está seu **nível de energia** ao longo do dia?",
    answerKey: "energyLevel",
    options: [
      { id: "exhausted", label: "Me sinto exausta a maior parte do tempo", emoji: "😩" },
      { id: "varies", label: "Varia ao longo do dia", emoji: "😮‍💨" },
      { id: "active", label: "Geralmente sou muito ativa", emoji: "⚡️" },
    ],
  },
  // 34 — Desire more energy
  {
    id: "wantsEnergy",
    type: "choice",
    image: img("wants-energy-hero", "full", "Mulher em pose de força, sorrindo", `${P}/wants-energy-hero.png`),
    headline: "Você gostaria de aumentar sua energia saúde e disposição de forma natural?.",
    answerKey: "wantsEnergy",
    options: [
      { id: "no", label: "Prefiro deixar como está", emoji: "🚫" },
      { id: "yes", label: "Sim, com certeza", emoji: "✅" },
    ],
  },
  // 36 — Loading (donut, building profile)
  {
    id: "buildingProfile",
    type: "loading",
    variant: "donut",
    headline: "Criando seu perfil de condicionamento...",
    subLabel: "Calculando respostas...",
    durationMs: 2600,
  },
  // 37 — Profile / BMI (real expert photo alongside stat rows)
  {
    id: "profile",
    type: "profile",
    headline: (a: Answers) => {
      const name = leadNameOf(a);
      return name
        ? `Pronto, ${name}. Esse é o seu perfil com base **nas suas respostas**:`
        : "Seu perfil com base em **suas respostas**:";
    },
    expertImage: { src: `${P}/profile-expert.png`, alt: "Mentora do programa" },
    ctaLabel: "Continuar",
  },
  // 38 — Readiness
  {
    id: "readiness",
    type: "choice",
    headline: "Está pronta para começar sua **transformação** ainda hoje?",
    answerKey: "readiness",
    options: [
      { id: "today", label: "Sim, farei meu primeiro treino hoje", emoji: "✅" },
      { id: "tomorrow", label: "Sim, mas começo amanhã", emoji: "✅" },
      { id: "unsure", label: "Não tenho certeza, mas quero tentar", emoji: "💪" },
    ],
  },
  // 39 — Next chapter
  {
    id: "nextChapter",
    type: "info",
    image: img("next-chapter-hero", "full", "Mulher caminhando ao entardecer, à beira do lago", `${P}/next-chapter-hero.png`),
    headline: "O **próximo capítulo** da sua vida começa agora!",
    body: "Se junte a nossa turma de mais de **35.789 Mulheres** que assim como você! Tiveram coragem de dar o primeiro passo e hoje são completamente gratas a **Calistenia Chinesa**! Mulheres empoderadas que vivem seu **auge** mesmo depois do 40!",
    ctaLabel: "Continuar",
  },
  // 40 — Final loading (4 sequential bars + rating + 2 real testimonial photos)
  {
    id: "finalLoading",
    type: "loading",
    variant: "sequential",
    headline: (a: Answers) => {
      const name = leadNameOf(a);
      return name
        ? `${name}, seu plano personalizado de\nCalistenia Chinesa está sendo criado...`
        : "Seu plano personalizado de\nCalistenia Chinesa está sendo criado...";
    },
    tasks: [
      "Analisando suas respostas",
      "Organizando a sequência das aulas",
      "Ajustando o nível de intensidade",
      "Criando seu treino personalizado",
    ],
    durationMs: 9600,
    showSocialProof: true,
    testimonials: [
      { src: `${P}/loading-testimonial-1.jpg`, alt: "Depoimento de aluna — antes e depois" },
      { src: `${P}/loading-testimonial-2.jpg`, alt: "Depoimento de aluna — antes e depois" },
    ],
  },
  // 41 — Weight projection chart
  {
    id: "projection",
    type: "chart",
    headline: "Com base em suas respostas,",
    ctaLabel: "Quero meu treino agora",
  },
  // 42 — App access explainer (3-phone mockup)
  {
    id: "appExplainer",
    type: "info",
    image: {
      key: "app-mockup",
      variant: "natural",
      alt: "Três telas do aplicativo mostrando as aulas em vídeo",
      src: `${P}/app-mockup.png`,
      naturalWidth: 1448,
      naturalHeight: 1086,
    },
    imagePosition: "middle",
    headline: "Criamos um **caminho simples** para você praticar calistenia",
    preBullets: [
      { text: "Todas as aulas são em vídeo, explicadas passo a passo, com movimentos claros e fáceis de acompanhar, mesmo para quem nunca praticou antes.", tone: "neutral" },
      { text: "Após finalizar sua inscrição, você recebe o acesso ao seu aplicativo imediatamente por e-mail e WhatsApp.", tone: "neutral" },
      { text: "O aplicativo é simples e intuitivo, ideal até para quem não tem experiência com tecnologia.", tone: "neutral" },
    ],
    bullets: [
      { text: "É só apertar o play, seguir a aula e evoluir aos poucos, dia após dia.", tone: "neutral" },
    ],
    ctaLabel: "EU QUERO COMEÇAR AGORA! 💪",
  },
  // 43 — Result / offer
  {
    id: "offer",
    type: "result",
    showProgress: false,
  },
];

export function stepIndex(id: string): number {
  return quizSteps.findIndex((s) => s.id === id);
}

/** Full option labels for every area selected in "Quais áreas do corpo você mais gostaria de ver mudanças?" — used as the offer page's "Objetivo" (never truncated). */
export function focusAreaFullLabel(a: Answers): string {
  const val = a.focusArea;
  const list = Array.isArray(val) ? val : val ? [val as string] : [];
  const map: Record<string, string> = {
    belly: "Barriga grande",
    arms: "Braços flácidos",
    butt: "Bumbum caído",
    legs: "Coxas e pernas flácidas",
    posture: "Postura curvada / ombros caídos",
    full: "Quero cuidar do corpo todo",
  };
  if (list.length === 0) return "Quero cuidar do corpo todo";
  return list.map((v) => map[v] ?? v).join(", ");
}

export function focusAreaLabel(a: Answers): string {
  const val = a.focusArea;
  const list = Array.isArray(val) ? val : val ? [val as string] : [];
  const map: Record<string, string> = {
    belly: "Barriga",
    arms: "Braços",
    legs: "Pernas",
    butt: "Bumbum",
    posture: "Postura",
    full: "Corpo Todo",
  };
  if (list.includes("full") || list.length === 0) return "Corpo Todo";
  return list.map((v) => map[v] ?? v).join(", ");
}

function valuePropHeadline(a: Answers): string {
  const val = a.focusArea;
  const list = Array.isArray(val) ? val : val ? [val as string] : [];
  if (list.includes("belly") && list.length === 1) {
    return "Consiga finalmente um **abdômen definido** e um corpo forte sem sair de casa";
  }
  if (list.includes("legs") && list.length === 1) {
    return "Consiga **pernas firmes** e tonificadas sem sair de casa";
  }
  if (list.includes("posture") && list.length === 1) {
    return "Recupere a **postura** e a firmeza das costas sem sair de casa";
  }
  return "Consiga finalmente o **corpo firme** que você quer sem sair de casa";
}

export function intensityLabel(a: Answers): string {
  const map: Record<string, string> = {
    light: "Leve e tranquilo",
    mid: "Intermediário",
    active: "Mais ativo",
    decide: "Adaptado ao seu ritmo",
  };
  return map[(a.intensity as string) ?? "decide"] ?? "Adaptado ao seu ritmo";
}

/**
 * The offer page's "Objetivo" card combines two answers: the goal step's answer verbatim,
 * plus each selected body-area "dor" from "Quais áreas do corpo..." rewritten as its
 * positive-opposite outcome (never shown as raw "dor" — reads oddly in an objective block).
 */
export function offerObjectiveLines(a: Answers): string[] {
  const positiveMap: Record<string, string> = {
    belly: "Eliminar barriga",
    arms: "Braços firmes e tonificados",
    legs: "Pernas firmes e tonificadas",
    butt: "Bumbum empinado",
    posture: "Postura mais alinhada",
    full: "Transformar o corpo todo",
  };
  const val = a.focusArea;
  const list = Array.isArray(val) ? val : val ? [val as string] : [];
  const areas = list.map((v) => positiveMap[v] ?? v);
  return [goalLabel(a), ...areas];
}

export function goalLabel(a: Answers): string {
  const map: Record<string, string> = {
    define: "Emagrecer sem sofrimento",
    strength: "Ganhar força e tonificar o corpo",
    pain: "Aliviar dores e recuperar mobilidade",
    health: "Melhorar minha saúde, energia e disposição",
  };
  return map[(a.goal as string) ?? "define"] ?? "Emagrecer sem sofrimento";
}

export function ageRangeLabel(a: Answers): string {
  const map: Record<string, string> = {
    "30-39": "30 e 39 anos",
    "40-49": "40 e 49 anos",
    "50-59": "50 e 59 anos",
    "60+": "60 anos ou mais",
  };
  return map[(a.ageRange as string) ?? "40-49"] ?? "40 e 49 anos";
}

/**
 * The offer page's "Tempo por dia" block needs the raw minute count (to render big and
 * bold) plus whether it was the lead's explicit pick or our recommendation for her — the
 * two render very differently (a plain "X minutos por dia" vs. a personalized sentence).
 */
export function timePerDayInfo(a: Answers): { minutes: string; isRecommended: boolean } {
  const raw = (a.duration as string) ?? "decide";
  if (raw === "decide" || !["7", "14", "21"].includes(raw)) {
    return { minutes: "14", isRecommended: true };
  }
  return { minutes: raw, isRecommended: false };
}
