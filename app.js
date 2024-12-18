let range = 10;
let tentativas = 1;
let listaDeNumerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();

function exibirTextosNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }}

function mensagensIniciais(){
    exibirTextosNaTela('h1', 'Descubra o número secreto!'); 
    exibirTextosNaTela('p' , `Escolha um número entre 0 e ${range}:`);
}

mensagensIniciais()

function verificarChute(){
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto){
        exibirTextosNaTela('h1','Você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextosNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto){
            exibirTextosNaTela('p',`O número secreto é menor que ${chute}`);
        } else{
            exibirTextosNaTela('p', `O número secreto é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    } 
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * range + 1);
    let quantidadeDeNumerosNaLista = listaDeNumerosSorteados.length;

    if(listaDeNumerosSorteados == range){
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return(numeroEscolhido);
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    mensagensIniciais();
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

document.getElementById('reiniciar').addEventListener('click', reiniciarJogo);
