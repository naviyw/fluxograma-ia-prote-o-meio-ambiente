const stepsData = {
  1: {
    title: "1. Coleta Global de Dados Ambientais (Início)",
    category: "Etapa Inicial - Coleta",
    icon: "fa-satellite-dish",
    summary: "Monitoramento contínuo da Terra por satélites, sensores e drones.",
    description: "Captura de dados brutos sobre temperatura, níveis de desmatamento, qualidade da água e emissões de carbono em tempo real.",
    examples: ["Imagens de satélite em alta resolução", "Sensores IoT florestais", "Boias oceânicas inteligentes"]
  },
  2: {
    title: "2. Processamento por IA e Machine Learning (Processo)",
    category: "Etapa de Análise",
    icon: "fa-brain",
    summary: "Análise inteligente para cruzar dados e detectar anomalias.",
    description: "Algoritmos de aprendizado profundo filtram grandes volumes de informação para identificar riscos ambientais iminentes e prever padrões.",
    examples: ["Reconhecimento de padrões por visão computacional", "Filtragem de dados ruidosos", "Modelagem estatística avançada"]
  },
  3: {
    title: "3. Tomada de Decisão do Algoritmo (Decisão)",
    category: "Ponto de Ramificação",
    icon: "fa-code-branch",
    summary: "A IA direciona os resultados para os ramos de ação específicos.",
    description: "Com base no tipo de dado analisado, o sistema ramifica a atuação para o monitoramento imediato, otimização de recursos ou alerta preditivo.",
    examples: ["Triagem por prioridade de emergência", "Roteamento autônomo de dados", "Atribuição de modelos de ação"]
  },
  4: {
    title: "4. Monitoramento em Tempo Real (Ramo A)",
    category: "Ação Prática",
    icon: "fa-shield-halved",
    summary: "Proteção direta contra destruição florestal e caça ilegal.",
    description: "Identificação instantânea de focos de incêndio e corte ilegal de árvores, enviando alertas com geolocalização para brigadas ambientais.",
    examples: ["Alertas de queimadas via satélite", "Microfones bioacústicos contra motosserras", "Rastreamento da vida selvagem"]
  },
  5: {
    title: "5. Otimização de Recursos Naturais (Ramo B)",
    category: "Eficiência & Redução",
    icon: "fa-bolt",
    summary: "Uso racional de água, insumos agrícolas e energia.",
    description: "Redução do impacto humano por meio de irrigação de precisão na agricultura e distribuição inteligente de energia solar e eólica.",
    examples: ["Redes elétricas inteligentes (Smart Grids)", "Agricultura de precisão sem desperdício", "Otimização de consumo em indústrias"]
  },
  6: {
    title: "6. Previsão Climática & Simulações (Ramo C)",
    category: "Análise Preditiva",
    icon: "fa-chart-line",
    summary: "Modelagem para evitar tragédias e planejar a resiliência urbana.",
    description: "Simulação de eventos meteorológicos extremos para emissão de alertas precoces à população e planejamento de cidades sustentáveis.",
    examples: ["Alertas de enchentes e secas", "Simulações de elevação do nível do mar", "Modelagem de sequestro de carbono"]
  },
  7: {
    title: "7. Planeta Sustentável & Futuro Protegido (Fim)",
    category: "Resultado Final",
    icon: "fa-earth-americas",
    summary: "Preservação eficiente impulsionada pela união entre tecnologia e ecologia.",
    description: "A integração contínua de todas as etapas resulta em ecossistemas mais resilientes, emissões reduzidas e conservação efetiva da biodiversidade.",
    examples: ["Restauração ecológica monitorada", "Redução contínua da pegada de carbono", "Equilíbrio sustentável alcançado"]
  }
};

let currentStep = 1;
const totalSteps = 7;

document.addEventListener("DOMContentLoaded", () => {
  updateFlowchartUI();
});

function selectStep(step) {
  currentStep = step;
  updateFlowchartUI();
}

function changeStep(delta) {
  const next = currentStep + delta;
  if (next >= 1 && next <= totalSteps) {
    currentStep = next;
    updateFlowchartUI();
  }
}

function resetFlowchart() {
  currentStep = 1;
  updateFlowchartUI();
}

function updateFlowchartUI() {
  for (let i = 1; i <= totalSteps; i++) {
    const node = document.getElementById(`node-${i}`);
    if (!node) continue;

    node.classList.remove("state-active", "state-passed", "state-inactive", "pulse-glow");

    if (i === currentStep) {
      node.classList.add("state-active", "pulse-glow");
    } else if (i < currentStep) {
      node.classList.add("state-passed");
    } else {
      node.classList.add("state-inactive");
    }
  }

  setLineActive("line-1-2", currentStep >= 2);
  setLineActive("line-2-3", currentStep >= 3);
  setLineActive("line-3-4", currentStep >= 4);
  setLineActive("line-3-5", currentStep >= 5);
  setLineActive("line-3-6", currentStep >= 6);
  setLineActive("line-4-7", currentStep === 7);
  setLineActive("line-5-7", currentStep === 7);
  setLineActive("line-6-7", currentStep === 7);

  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const counter = document.getElementById("step-counter");

  if (btnPrev) btnPrev.disabled = currentStep === 1;
  if (counter) counter.innerText = `Passo ${currentStep} de ${totalSteps}`;

  if (btnNext) {
    if (currentStep === totalSteps) {
      btnNext.innerHTML = `<span>Concluído</span> <i class="fa-solid fa-check"></i>`;
      btnNext.className = "px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-md";
    } else {
      btnNext.innerHTML = `<span>Próximo Passo</span> <i class="fa-solid fa-arrow-right"></i>`;
      btnNext.className = "px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-md shadow-emerald-600/20";
    }
  }

  renderStepDetail();
}

function setLineActive(lineId, active) {
  const line = document.getElementById(lineId);
  if (!line) return;

  if (active) {
    line.classList.add("active");
    line.setAttribute("marker-end", "url(#arrow-active)");
  } else {
    line.classList.remove("active");
    line.setAttribute("marker-end", "url(#arrow-default)");
  }
}

function renderStepDetail() {
  const data = stepsData[currentStep];
  const detailBox = document.getElementById("step-detail-box");
  const titleElem = document.getElementById("current-step-title");
  const subtitleElem = document.getElementById("current-step-subtitle");

  if (titleElem) titleElem.innerText = data.title;
  if (subtitleElem) subtitleElem.innerText = data.summary;

  const listHtml = data.examples.map(item => `
    <li class="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
      <i class="fa-solid fa-circle-check text-emerald-600 text-sm shrink-0"></i>
      <span>${item}</span>
    </li>
  `).join('');

  detailBox.className = "mt-8 p-6 rounded-2xl bg-white border border-emerald-100 shadow-xl shadow-emerald-900/5 animate-fadeIn";
  detailBox.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg font-bold">
          <i class="fa-solid ${data.icon}"></i>
        </div>
        <div>
          <span class="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">${data.category}</span>
          <h3 class="font-heading text-lg font-bold text-slate-800">${data.title}</h3>
        </div>
      </div>
      <span class="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 self-start sm:self-auto">
        Passo ${currentStep} de ${totalSteps}
      </span>
    </div>

    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">${data.description}</p>

    <div>
      <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Exemplos Práticos:</h4>
      <ul class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        ${listHtml}
      </ul>
    </div>
  `;
}
