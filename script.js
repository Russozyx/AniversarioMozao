// script.js
(() => {
  const envelope = document.getElementById('envelope');
  const letter = document.getElementById('letter');
  const poem = document.getElementById('poem');
  const music = document.getElementById('music');

  // texto do poema
  const poemText = `Hoje o mundo celebra teu existir, e eu celebro o privilégio de poder te amar.
Não há presente que se compare à tua presença, nem data que mereça mais ser lembrada do que o instante em que vieste ao mundo.
Cada aniversário teu é um lembrete silencioso de que o universo, por alguma razão que não sei explicar, me concedeu a sorte de cruzar teu caminho.

Penso em ti e percebo que cada traço teu carrega algo divino — um mistério que o tempo não desfaz, uma beleza que não se mede em aparência, mas em essência.
Teus gestos são poesia viva, teu olhar é abrigo, tua voz é o som mais seguro que o mundo poderia oferecer.
E hoje, mais do que nunca, tudo em mim quer dizer o quanto tu és rara, o quanto tua existência transforma o comum em algo digno de eternidade.

Queria estar aí, perto, para te abraçar devagar e sentir o tempo parar entre meus dedos.
Queria poder sussurrar em teu ouvido que o amor que te tenho não depende da distância, que ele sobrevive aos silêncios, aos medos, e floresce até mesmo nas ausências.
Tu és a razão de todas as minhas palavras, o motivo de cada verso que insisto em escrever — és o próprio sentido de tudo o que me torna humano.

E hoje, quando o mundo sopra velas em tua direção, eu sopro junto, mas não para pedir — e sim para agradecer.
Agradecer por existires, por seres quem és, por carregares essa luz calma que me guia mesmo quando não estás por perto.
Teu aniversário não é apenas o início de mais um ciclo, é a lembrança viva de que há beleza no mundo — e ela tem o teu nome.

Prometo seguir contigo, mesmo que em silêncio, mesmo que à distância.
Prometo te amar nas horas caladas, nos dias longos, nos sonhos que ainda vamos construir.
Prometo ser abrigo, porto e testemunha de cada passo teu, sempre com o mesmo coração que hoje bate por ti.

Feliz aniversário, meu amor.
Que a vida te devolva, em dobro, tudo o que tens me dado:
a calma, o afeto, a esperança e essa paz que só encontro quando penso em ti.

E quando o tempo passar — e tudo mudar —, lembra-te de que há alguém que ainda te vê com o mesmo encanto do primeiro instante.
Alguém que te admira, te deseja e te ama com uma devoção que não se apaga,
porque amar-te é mais do que um sentimento: é o próprio destino que escolhi seguir.

Para sempre teu,
Raphael Silva Mendonça`;

  let interacted = false;
  const ANIMATION_MS = 1000; // tempo da animação (sincronizar com CSS)

  function fadeInAudio(duration = 3000) {
    try {
      music.volume = 0;
      const start = performance.now();
      music.play().catch(err => {
        console.warn('Erro ao iniciar áudio (play):', err);
      });

      function step(now) {
        const elapsed = now - start;
        const t = Math.min(1, elapsed / duration);
        music.volume = t * 1.0; // fade até volume 1.0
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    } catch (e) {
      console.warn('Falha no fade-in do áudio:', e);
    }
  }

  function openEnvelopeSequence() {
    // se já abriu, ignora
    if (interacted) return;
    interacted = true;

    // chama play imediatamente em volume 0 para garantir desbloqueio no iOS
    // e depois faremos fade-in quando a carta aparecer
    try {
      music.volume = 0;
      // play() dentro do gesto do usuário tem alta chance de ser aceito no iOS
      music.play().then(() => {
        // pausamos rapidamente para garantir que o som não seja ouvido antes da carta abrir
        music.pause();
        music.currentTime = 0;
      }).catch(() => {
        // pode falhar em alguns casos; não crítico
      });
    } catch (e) {
      console.warn('Erro tentando pré-play do áudio:', e);
    }

    // anima o envelope (sobe e some)
    envelope.style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out';
    envelope.style.transform = 'translate(-50%, -120%) rotateX(90deg)';
    envelope.style.opacity = '0';

    // depois do tempo de animação, remove envelope e mostra carta
    setTimeout(() => {
      envelope.style.display = 'none';
      letter.classList.add('open');
      poem.textContent = poemText;

      // agora toca com fade-in suave
      fadeInAudio(3000);
    }, ANIMATION_MS);
  }

  // Usa pointerdown para cobrir mouse/touch; listener com {once: true} para disparar só uma vez
  envelope.addEventListener('pointerdown', (e) => {
    // previne gestos de scroll rápidos em alguns dispositivos
    if (e.cancelable) e.preventDefault();
    openEnvelopeSequence();
  }, { passive: false, once: true });

  // fallback: também aceita clique por segurança (alguns browsers tratam de forma diferente)
  envelope.addEventListener('click', (e) => {
    openEnvelopeSequence();
  }, { once: true });

  // protege contra execução precoce do script - se elemento não existir, loga
  if (!envelope || !letter || !poem || !music) {
    console.error('Elementos não encontrados: certifique-se de que IDs existem no HTML.');
  }
})();
