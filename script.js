window.onload = () => {
  const envelope = document.querySelector('.envelope');
  const letter = document.querySelector('.letter');
  const poem = document.getElementById('poem');
  const music = document.getElementById('music');

  // Texto do poema
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

  // Abertura do envelope
  setTimeout(() => {
    envelope.style.transform = 'translate(-50%, -100%) rotateX(90deg)';
    setTimeout(() => {
      letter.classList.add('open');
      poem.textContent = poemText;
      music.play().catch(() => console.log('Autoplay bloqueado'));
    }, 1000);
  }, 2000);
};
