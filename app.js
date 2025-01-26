let listaDeAmigos = [];

let voice = []; // Array para armazenar as vozes carregadas

function carregarVozes() {
    
    const synth = window.speechSynthesis.getVoices();

    if (!synth) {
       alert('Seu navegador não suporta síntese de fala.');
       return;
    }
     voices.forEach((voice, index) => {
                 
        console.log(`${index}: ${voice.name} (${voice.lang}) - ${voice.default ? 'Default' : ''}`);
    });
}

carregarVozes();

// Adiciona um listener para garantir que as vozes sejam carregadas

synth.onvoiceschanged = carregarVozes();

function lerTextoEmVoz(texto) {
    const synth = window.speechSynthesis;
    if (!synth) {
        alert('Seu navegador não suporta síntese de fala.');
        return;
    }

    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.voice = synth.getVoices().find(voice => voice.lang === 'pt-BR') || null;
    utterance.rate = 1.5;

    if (utterance.voice) {
        synth.speak(utterance);
    } else {
        console.warn('Nenhuma voz compatível encontrada.');
    }
}

function adicionarAmigo() {
    const input = document.getElementById('amigo');
    const nome = input.value.toUpperCase();

    if (nome === '') {
        alert('Por favor, insira um nome:');
        return;
    }

    const nomeValido = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    if (!nomeValido.test(nome)) {
        alert('Nome inválido! Apenas letras e espaços são permitidos.');
        return;
    }

    if (nome.length < 3) {
        alert('O nome deve conter pelo menos 3 caracteres.');
        input.value = '';
        return;
    }

    if (listaDeAmigos.some(amigo => amigo.toLowerCase() === nome.toLowerCase())) {
        alert('Esse nome já foi adicionado!');
        return;
    }

    listaDeAmigos.push(nome);
    input.value = '';
    atualizarListaAmigos();
}

function atualizarListaAmigos() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';

    if (!listaDeAmigos.length) return;
    const fragment = document.createDocumentFragment();
    listaDeAmigos.forEach(function (amigo) {
        const item = document.createElement('li');
        const texto = document.createElement('span');
        texto.textContent = amigo;
        texto.className = 'name-item';
        item.appendChild(texto);
        fragment.appendChild(item);
    });

    lista.appendChild(fragment);
}

function sortearAmigo() {
    const resultado = document.getElementById('resultado');
    if (listaDeAmigos.length < 2) {
        const mensagem = 'É necessário ter pelo menos 2 participantes para realizar o sorteio.';
        if (resultado) {
            lerTextoEmVoz(mensagem);
            resultado.innerHTML = mensagem;
            resultado.style.color = 'red';
            setTimeout(() => {
                resultado.innerHTML = '';
            }, 5000);
        }
        return;
    }

    const indiceSorteado = Math.floor(Math.random() * listaDeAmigos.length);
    const amigoSorteado = listaDeAmigos[indiceSorteado];

    if (resultado) {
        shoot();
        lerTextoEmVoz('O amigo sorteado foi ' + amigoSorteado);
        resultado.innerHTML = 'O AMIGO SORTEADO FOI: ' + amigoSorteado + '!';
        removerAmigo(amigoSorteado);
       
    }
}


function reiniciarSorteio() {
    let limparLista = document.getElementById('listaAmigos');
    limparLista.innerHTML = '';
    listaDeAmigos = [];
    let limparResultado = document.getElementById('resultado');
    limparResultado.innerHTML = '';
}

function removerAmigo(nome) {
    listaDeAmigos = listaDeAmigos.filter(amigo => amigo !== nome);
    atualizarListaAmigos();
    
}



function shoot() {
    confetti({
      ...defaults,
      particleCount: 100,
      scalar: 1.2,
      shapes: ['star']
    });
  
    confetti({
      ...defaults,
      particleCount: 200,
      scalar: 0.75,
      shapes: ['circle']
    });
  }
  
  setTimeout(shoot, 0);
  
var defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
  };


    











