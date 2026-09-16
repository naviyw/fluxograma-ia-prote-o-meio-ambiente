// Configuração da biblioteca Mermaid para renderizar o fluxograma com tema suave
document.addEventListener("DOMContentLoaded", function () {
  mermaid.initialize({
    startOnLoad: true,
    theme: 'base',
    themeVariables: {
      fontFamily: 'Poppins, sans-serif',
      primaryColor: '#e8f8f5',
      primaryTextColor: '#2c3e50',
      primaryBorderColor: '#a3e4d7',
      lineColor: '#85c1e9',
      secondaryColor: '#ebf5fb',
      tertiaryColor: '#ffeab6'
    },
    flowchart: {
      curve: 'smooth', // Deixa as linhas curvas e elegantes
      htmlLabels: true
    }
  });
});
