
const doc = this.document.querySelector("html");
const topBt = document.querySelector(".button-top");
const badBt = document.querySelector(".button-bad");
const inspiredBt = document.querySelector(".button-inspired");
const angryBt = document.querySelector(".button-angry");
const chillingBt = document.querySelector(".button-chilling");
const botoes = [topBt, badBt, inspiredBt, angryBt, chillingBt];
let botaoAtivo = null;

const botaoControle = document.querySelector(".controle__cronometro");
const botaoRecomeco = document.querySelector(".reinicio__cronometro");
const tempoNaTela = document.querySelector(".texto__cronometro");

const musicaTop = new Audio('./audio/Animado.mp3');
const musicaBad = new Audio('./audio/Bad.mp3');
const musicaMotivado = new Audio('./audio/Motivado.mp3');
const musicaPistola = new Audio('./audio/Pistola.mp3');
const musicaTranquilo = new Audio('./audio/Tranquilo.mp3');
const musicas = [musicaTop, musicaBad, musicaMotivado, musicaPistola, musicaTranquilo];

musicaTop.loop, musicaBad.loop, musicaMotivado.loop, musicaPistola.loop, musicaTranquilo.loop = true;
let musicaTocando = null;

const tempoInicial = 0;
let intervaloId = null;
let tempoDecorrido = 0;


function setButtons() {
    for (let c = 0; c < botoes.length; c++) {
        botoes[c].addEventListener('click', () => {
            if(musicaTocando != musicas[c])
            {
                if (musicaTocando != null){
                    pausaMusica();
                }
                tocaMusica(musicas[c]);
                if(botaoAtivo != null){
                    botaoAtivo.classList.remove('ativo');
                }
                botoes[c].classList.add('ativo');
                botaoAtivo = botoes[c];
            }
            else
            {
                pausaMusica();
                if(botaoAtivo != null){
                    botaoAtivo.classList.remove('ativo');
                }
            }
        });
    }
}


function tocaMusica(musica)
{
    c = 0;
    for (let c = 0; c < musicas.length; c++) {
        musicas[c].pause();
        if(musicas[c] == musica)
        {
            musicas[c].play();
            musicaTocando = musicas[c];
            mudaCorEFonte();
        }
    }
}

function pausaMusica() {
    musicaTocando.pause();
    musicaTocando.currentTime = 0;
    musicaTocando = null;
}


function mudaCorEFonte(){
    switch (musicaTocando){
        case musicaTop:
            doc.style.setProperty('--fonte-principal', 'var(--fonte-top)');
            doc.style.setProperty('--cor-primaria', 'var(--cor-primaria-top)');
            doc.style.setProperty('--cor-secundaria', 'var(--cor-secundaria-top)');
            doc.style.setProperty('--cor-terciaria', 'var(--cor-terciaria-top)');
            doc.style.setProperty('--cor-quarternaria', 'var(--cor-quarternaria-top)');
            break;
        case musicaBad:
            doc.style.setProperty('--fonte-principal', 'var(--fonte-bad)');
            doc.style.setProperty('--cor-primaria', 'var(--cor-primaria-bad)');
            doc.style.setProperty('--cor-secundaria', 'var(--cor-secundaria-bad)');
            doc.style.setProperty('--cor-terciaria', 'var(--cor-terciaria-bad)');
            doc.style.setProperty('--cor-quarternaria', 'var(--cor-quarternaria-bad)');
            break;
        case musicaMotivado:
            doc.style.setProperty('--fonte-principal', 'var(--fonte-motivado)');
            doc.style.setProperty('--cor-primaria', 'var(--cor-primaria-motivado)');
            doc.style.setProperty('--cor-secundaria', 'var(--cor-secundaria-motivado)');
            doc.style.setProperty('--cor-terciaria', 'var(--cor-terciaria-motivado)');
            doc.style.setProperty('--cor-quarternaria', 'var(--cor-quarternaria-motivado)');
            break;
        case musicaPistola: 
            doc.style.setProperty('--fonte-principal', 'var(--fonte-pistola)');
            doc.style.setProperty('--cor-primaria', 'var(--cor-primaria-pistola)');
            doc.style.setProperty('--cor-secundaria', 'var(--cor-secundaria-pistola)');
            doc.style.setProperty('--cor-terciaria', 'var(--cor-terciaria-pistola)');
            doc.style.setProperty('--cor-quarternaria', 'var(--cor-quarternaria-pistola)');
            break;
        case musicaTranquilo:
            doc.style.setProperty('--fonte-principal', 'var(--fonte-chilling)');
            doc.style.setProperty('--cor-primaria', 'var(--cor-primaria-chilling)');
            doc.style.setProperty('--cor-secundaria', 'var(--cor-secundaria-chilling)');
            doc.style.setProperty('--cor-terciaria', 'var(--cor-terciaria-chilling)');
            doc.style.setProperty('--cor-quarternaria', 'var(--cor-quarternaria-chilling)');
            break;
    }
}


botaoControle.addEventListener('click', () => {
    if(intervaloId == null){
        iniciar();
    }
    else{
        pausar();
    }
});

botaoRecomeco.addEventListener('click', () => {
    reiniciar();
    botaoControle.innerHTML = `<i class="fa-solid fa-play"></i>Iniciar`;
    botaoRecomeco.classList.add('oculto');
});


function iniciar(){
    /*setInterval realiza uma função a cada certo período de tempo.
    Esse tempo é sempre passado em milisegundos*/
    intervaloId = setInterval(contagem, 100);
    botaoControle.innerHTML = `<i class="fa-solid fa-pause"></i>Pausar`;
    botaoRecomeco.classList.add('oculto');
}

function pausar(){
    /* Zera o intervalo e o retorna ao estado inicial de null */
    clearInterval(intervaloId);
    intervaloId = null;
    botaoControle.innerHTML = `<i class="fa-solid fa-play"></i>Continuar`;
    botaoRecomeco.classList.remove('oculto');
}

function reiniciar(){
    tempoDecorrido = tempoInicial;
    mostrarTempo();
}

function contagem(){
    tempoDecorrido += .1;
    mostrarTempo();
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorrido*1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute:'2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}` + `.${Math.round(tempo.getMilliseconds()/100)}`;
}

mostrarTempo();
setButtons();