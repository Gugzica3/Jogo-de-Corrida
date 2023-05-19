document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    const largura = 0.9 * window.innerWidth; // O canvas ocupa 90% da largura da janela
    const altura = 400;
    const tamanhoJogador = 50;
    const tamanhoInimigo = 50;
    let velocidadeJogador = 8;

    let posicaoJogadorX = 0;
    let posicaoInimigoX = 0;
    let velocidadeInimigo = 0;

    const botaoAcelerar = document.getElementById('accelerate');
    let aceleracao = 0;
    let jogoIniciado = false;

    function desenharPista() {
        // Desenhe a pista de corrida
        context.fillStyle = '#333'; // Cor da pista
        context.fillRect(0, 0, largura, altura);

        // Desenhe a rua
        const faixaAltura = altura * 0.1; // Altura das faixas de rua (10% da altura total)
        const faixaEspacamento = largura * 0.05; // Espaçamento entre as faixas de rua
        const faixaY = (altura - faixaAltura) / 2; // Posição Y das faixas de rua

        // Desenhe as faixas de rua
        const numFaixas = 8; // Número de faixas de rua
        const faixaLargura = (largura - (numFaixas - 1) * faixaEspacamento) / numFaixas; // Largura das faixas de rua

        context.fillStyle = '#fff'; // Cor das faixas de rua
        for (let i = 0; i < numFaixas; i++) {
            const faixaX = i * (faixaLargura + faixaEspacamento); // Posição X da faixa de rua
            context.fillRect(faixaX, faixaY, faixaLargura, faixaAltura);
        }
    }



    function desenharJogador() {
        // Jogador azul
        const jogadorAzulY = 290 ; // Posição Y do jogador azul (no final da tela)
        context.fillStyle = 'blue';
        context.fillRect(posicaoJogadorX, jogadorAzulY, tamanhoJogador, tamanhoJogador);
    }

    function desenharInimigo() {
        const posicaoInimigoY = 60;
        context.fillStyle = 'red';
        context.fillRect(posicaoInimigoX,posicaoInimigoY, tamanhoInimigo, tamanhoInimigo);
    }

    function limparCanvas() {
        context.clearRect(0, 0, largura, altura);
    }

    function atualizar() {
        limparCanvas();

        desenharPista();
        desenharJogador();
        desenharInimigo();

        if (jogoIniciado) {
            if (aceleracao > 0) {
                posicaoJogadorX += velocidadeJogador + aceleracao;
                aceleracao -= 0.1;
            }

            if (posicaoJogadorX < 0) {
                posicaoJogadorX = 0;
            }

            if (posicaoJogadorX + tamanhoJogador > largura) {
                posicaoJogadorX = largura - tamanhoJogador;
            }

            posicaoInimigoX += velocidadeInimigo;

            if (posicaoInimigoX <= 0 || posicaoInimigoX + tamanhoInimigo >= largura) {
                if (posicaoInimigoX <= 0) {
                    alert('Você perdeu!');
                } else {
                    alert('Você perdeu!');
                }
                resetarJogo();
            } else if (posicaoJogadorX + tamanhoJogador >= largura) {
                alert('Você ganhou!');
                resetarJogo();
            } else {
                requestAnimationFrame(atualizar);
            }
        }
    }

    function resetarJogo() {
        aceleracao = 0;
        posicaoJogadorX = 0;
        posicaoInimigoX = 0;
        velocidadeInimigo = 0;
        jogoIniciado = false;
    }

    function obterVelocidadeDificuldade() {
        const dificuldade = document.querySelector('input[name="difficulty"]:checked').value;

        switch (dificuldade) {
            case 'easy':
                return { jogador: 8, inimigo: 1 };
            case 'medium':
                return { jogador: 13, inimigo: 2 };
            case 'hard':
                return { jogador: 15, inimigo: 3 };
            default:
                return { jogador: 8, inimigo: 2 };
        }
    }

    botaoAcelerar.addEventListener('click', () => {
        if (!jogoIniciado) {
            jogoIniciado = true;
            const velocidades = obterVelocidadeDificuldade();
            velocidadeJogador = velocidades.jogador;
            velocidadeInimigo = velocidades.inimigo;
            requestAnimationFrame(atualizar);
        } else {
            aceleracao += 0.1;
        }
    });

    canvas.width = largura;
    canvas.height = altura;

    desenharPista();
    desenharJogador();
    desenharInimigo();
});
