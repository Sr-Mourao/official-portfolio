document.addEventListener("DOMContentLoaded", () => {
  // Registra o plugin TextPlugin no GSAP
  gsap.registerPlugin(TextPlugin);

  // Anima o texto com um efeito de digitação
  gsap.fromTo(
    "#animate-text",
    { text: "" }, // Começa com um texto vazio
    {
      text: "Sou o Felipe Mourão", // Texto que será exibido
      duration: 2, // Duração da animação em segundos
      ease: "power1.inOut", // Tipo de easing
    }
  );
});
