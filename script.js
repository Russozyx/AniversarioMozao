/* script.js - controla animações, digitação e áudio */
const envelope = document.getElementById('envelope');
const seal = document.getElementById('seal');
const letter = document.getElementById('letter');
const typed = document.getElementById('typed');
const signature = document.querySelector('.signature');
const audio = document.getElementById('bg-audio');

/* poema (texto contínuo escolhido por você) */
const poem = `Hoje o mundo celebra teu existir, e eu celebro o privilégio de poder te amar.
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
porque amar-te é mais do que um sentimento: é o próprio destino que escolhi seguir.`;

/* função para animar partículas leves (canvas) */
(function floatingParticles(){
  const canvas = document.getElementById('floaters');
  const ctx = canvas.getContext('2d');
  let w,h,particles=[];

  function resize(){ w=canvas.width=innerWidth; h=canvas.height=innerHeight; particles=[]; for(let i=0;i<90;i++){particles.push({
    x: Math.random()*w,
    y: Math.random()*h,
    r: Math.random()*1.6+0.6,
    a: Math.random()*0.6+0.12,
    vx: (Math.random()-0.5)*0.1,
    vy: - (0.05 + Math.random()*0.2)
  })}}
  function frame(){
    ctx.clearRect(0,0,w,h);
    particles.forEach(p=>{
      p.x += p.vx; p.y += p.vy;
      if(p.y < -10) p.y = h+10;
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,210,150,${p.a})`;
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    });
    requestAnimationFrame(frame);
  }
  window.addEventListener('resize', ()=>{resize()});
  resize(); frame();
})();

/* tentativa de autoplay (alguns navegadores bloqueiam) */
function tryAutoplay() {
  if(!audio) return;
  audio.volume = 0.85;
  audio.play().catch(()=>{/* autoplay bloqueado; será reproduzido quando usuário interagir */});
}
tryAutoplay();

/* abrir envelope e escrever */
let typingIndex = 0;
let openStarted = false;

async function openEnvelope(){
  if(openStarted) return;
  openStarted = true;
  // animação da tampa e carta saindo
  envelope.classList.add('open'); // atributo visual handled by CSS (flip flap, move letter)
  // give a small delay for flap flip, then slide letter out
  setTimeout(()=> {
    // play audio if blocked earlier
    audio.play().catch(()=>{});
    // show letter transform is controlled by CSS (.open)
    // start typing after slight delay (paper fully out)
    setTimeout(startTyping, 800);
  }, 700);
}

/* typing effect */
function startTyping(){
  const speed = 28; // ms por caractere
  function step(){
    if(typingIndex < poem.length){
      typed.innerHTML += poem.charAt(typingIndex) === '\n' ? '<br>' : poem.charAt(typingIndex);
      typingIndex++;
      // scroll within typed container if needed (mobile)
      const container = typed.parentElement;
      if(container) container.scrollTop = container.scrollHeight;
      setTimeout(step, speed);
    } else {
      // mostrar assinatura com leve fade
      const sig = document.querySelector('.signature');
      if(sig) sig.style.opacity = 1;
    }
  }
  step();
}

/* interação: clicar no selo abre */
seal.addEventListener('click', ()=> {
  // small visual "press" feedback
  seal.animate([{transform:'translateY(0)'},{transform:'translateY(4px)'}],{duration:140,fill:'forwards',direction:'alternate'});
  openEnvelope();
});

/* também abrir automaticamente após 1.8s (opcional) */
window.addEventListener('load', ()=> {
  setTimeout(()=> {
    // tentar abrir automaticamente — browsers podem exigir interação para som,
    // mas a animação visual funciona; música tentará tocar
    openEnvelope();
  }, 1400);
});
