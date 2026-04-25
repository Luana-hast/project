const TOTAL = 9;
  let atual = 0;
 
  // LINGUAGEM: JS — Referências aos elementos do DOM
  const slides   = document.querySelectorAll('.slide');
  const dotsCont = document.getElementById('dots');
  const cnt      = document.getElementById('cnt');
  const bant     = document.getElementById('bant');
  const bprox    = document.getElementById('bprox');
  const prog     = document.getElementById('prog');
 
  // LINGUAGEM: JS — Cria os pontos de navegação dinamicamente
  slides.forEach((_, i) => {
    const d = document.createElement('div');
    d.classList.add('dot');
    if (i === 0) d.classList.add('on');
    d.addEventListener('click', () => irPara(i)); // LINGUAGEM: JS — clique navega ao slide i
    dotsCont.appendChild(d);
  });
 
  // LINGUAGEM: JS — Vai para um slide específico pelo índice
  function irPara(idx) {
    slides[atual].classList.remove('on'); // LINGUAGEM: JS — oculta slide atual
    atual = idx;
    slides[atual].classList.add('on');    // LINGUAGEM: JS — exibe slide destino
 
    // LINGUAGEM: JS — Rola ao topo os slides com scroll (s8 e s9)
    if (atual === 7 || atual === 8) slides[atual].scrollTop = 0;
 
    atualizar(); // LINGUAGEM: JS — atualiza indicadores visuais
  }
 
  // LINGUAGEM: JS — Navega para o próximo (+1) ou anterior (-1)
  function navegar(dir) {
    const n = atual + dir;
    if (n >= 0 && n < TOTAL) irPara(n); // LINGUAGEM: JS — respeita os limites
  }
 
  // LINGUAGEM: JS — Atualiza pontos, contador, botões e barra de progresso
  function atualizar() {
    // LINGUAGEM: JS — Marca o ponto do slide ativo
    document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('on', i === atual));
 
    // LINGUAGEM: JS — Atualiza o texto do contador (ex: "3 / 9")
    cnt.textContent = `${atual + 1} / ${TOTAL}`;
 
    // LINGUAGEM: JS — Desativa botão no primeiro e último slide
    bant.disabled  = atual === 0;
    bprox.disabled = atual === TOTAL - 1;
 
    // LINGUAGEM: JS — Atualiza a largura da barra de progresso
    prog.style.width = `${((atual + 1) / TOTAL) * 100}%`;
  }
 
  // LINGUAGEM: JS — Exibe o toast de confirmação de reserva
  function mostrarToast() {
    const t = document.getElementById('toast');
    t.classList.add('on');                                    // LINGUAGEM: JS — aparece
    setTimeout(() => t.classList.remove('on'), 3200);         // LINGUAGEM: JS — desaparece após 3.2s
  }
 
  // LINGUAGEM: JS — Navegação pelo teclado (setas direcionais)
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') navegar(1);  // LINGUAGEM: JS — próximo
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   navegar(-1); // LINGUAGEM: JS — anterior
  });
 
  // LINGUAGEM: JS — Suporte a swipe em dispositivos touch (mobile)
  let tx = 0;
  document.addEventListener('touchstart', e => { tx = e.changedTouches[0].clientX; });
  document.addEventListener('touchend', e => {
    const d = tx - e.changedTouches[0].clientX;
    if (Math.abs(d) > 50) navegar(d > 0 ? 1 : -1); // LINGUAGEM: JS — swipe esq/dir
  });
 
  // LINGUAGEM: JS — Inicializa a interface ao carregar
  atualizar();
 
  // LINGUAGEM: JS — IntersectionObserver para animação de entrada dos cards
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity   = '1';              // LINGUAGEM: JS — torna o card visível
        e.target.style.transform = 'translateY(0)';  // LINGUAGEM: JS — sobe para posição final
      }
    });
  }, { threshold: 0.1 });
 
  // LINGUAGEM: JS — Aplica animação escalonada nos cards
  document.querySelectorAll('.dcard, .acard, .evcard, .av-card').forEach((c, i) => {
    c.style.opacity   = '0';
    c.style.transform = 'translateY(16px)';
    c.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
    obs.observe(c); // LINGUAGEM: JS — registra o card no observer
  });