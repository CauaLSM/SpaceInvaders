document.addEventListener('DOMContentLoaded', () => {
    const telaInicial = document.getElementById('tela-inicial');
    const telaSelecaoFases = document.getElementById('tela-selecao-fases');
    const btnIniciar = document.getElementById('btn-iniciar');
    const btnComoJogar = document.getElementById('btn-como-jogar');
    const btnFase1 = document.getElementById('btn-fase-1');
    const btnFase2 = document.getElementById('btn-fase-2');
    const btnFase3 = document.getElementById('btn-fase-3');
   
    btnIniciar.addEventListener('click', () => {
        telaInicial.style.display = 'none';
        telaSelecaoFases.style.display = 'block';
    });

    btnComoJogar.addEventListener('click', () => {
        alert('Instruções:\nSetas direita/esquerda para movimentar\nBarra de espaço para atirar');
    });

    btnFase1.addEventListener('click', () => {
        telaSelecaoFases.style.display = 'none';
        fase(500,1); 
    });

    btnFase2.addEventListener('click', () => {
        telaSelecaoFases.style.display = 'none';
        fase(370,2);
    });

    btnFase3.addEventListener('click', () => {
        telaSelecaoFases.style.display = 'none';
        fase(250,3); 
    });
    

    function fase(velocidade, lvl){
        const quadrado = document.querySelectorAll('.grade div')
        const resultadoMostrado = document.querySelector('.resultado')
        
        let largura = 15
        let indexAtiradorAtual = 202
        let indexInvasorAtual = 0
        let aliensAbatidos = []
        let resultado = 0
        let direcao = 1
        let idInvasor 
        let lvlInvasor
        
        const aliensInvasores = [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            15, 16, 17, 18, 19, 20, 21, 22,23,24,
            30, 31, 32, 33, 34, 35, 36, 37, 38, 39
        ]
    
        if(lvl == 1){
            lvlInvasor = 'invasor'
        } 
        else if (lvl == 2){
            lvlInvasor = 'invasor2'       
        }
        else if (lvl == 3){
            lvlInvasor = 'invasor3'       
        }
            aliensInvasores.forEach(invasor => quadrado[indexInvasorAtual + invasor].classList.add(lvlInvasor))
        
            quadrado[indexAtiradorAtual].classList.add('atirador')
        
            function moverAtirador(e){
                quadrado[indexAtiradorAtual].classList.remove('atirador')
                switch(e.keyCode){
                    case 37:
                        if(indexAtiradorAtual % largura !== 0) indexAtiradorAtual -=1
                        break
                    case 39:
                        if(indexAtiradorAtual % largura < largura - 1) indexAtiradorAtual +=1
                        break
                }
                quadrado[indexAtiradorAtual].classList.add('atirador')
            }
                document.addEventListener('keydown', moverAtirador)
        
            function moverInvasores(){
                const bordaDireita = aliensInvasores[aliensInvasores.length - 1] % largura === largura -1
                const bordaEsquerda = aliensInvasores[0] % largura === 0
            
                if((bordaEsquerda && direcao === -1) || (bordaDireita && direcao === 1)){
                    direcao = largura
                } else if(direcao === largura){
                    if(bordaEsquerda) direcao = 1
                    else direcao = -1
                }

                for(let i = 0; i <= aliensInvasores.length -1; i++){
                    quadrado[aliensInvasores[i]].classList.remove(lvlInvasor)
                }

                for(let i = 0; i <= aliensInvasores.length -1; i++){
                    aliensInvasores[i] += direcao
                }
                
                for(let i = 0; i <= aliensInvasores.length -1; i++){
                    if (!aliensAbatidos.includes(i)){
                        quadrado[aliensInvasores[i]].classList.add(lvlInvasor)
                    }
                }
            
                if(quadrado[indexAtiradorAtual].classList.contains(lvlInvasor, 'atirador')){
                    alert('Você Perdeu!') 
                    resultadoMostrado.innerHTML = 'Fim de Jogo!'
                    quadrado[indexAtiradorAtual].classList.add('explosao')
                    clearInterval(idInvasor)
                
                }
                
                
                for(let i = 0; i <= aliensInvasores.length -1; i++){
                    if(aliensInvasores[i] > (quadrado.length - (largura-1))){
                        alert('Você Perdeu!')
                        resultadoMostrado.innerHTML = 'Fim de Jogo!'
                        clearInterval(idInvasor)
                    }
                    
                }   
                
                if(aliensAbatidos.length === aliensInvasores.length){
                    alert('Você Ganhou!!')
                    resultadoMostrado.innerHTML = 'Você Ganhou!!'
                
                    clearInterval(idInvasor)
                    
                }
                 
            }
            
            idInvasor = setInterval(moverInvasores, velocidade)
        
            function atirar(e){
                let laserId
                let indexLaserAtual = indexAtiradorAtual
                
                function moverLaser(){
                    quadrado[indexLaserAtual].classList.remove('laser')
                    indexLaserAtual -= largura
                    quadrado[indexLaserAtual].classList.add('laser')
                    if(quadrado[indexLaserAtual].classList.contains(lvlInvasor)){
                        quadrado[indexLaserAtual].classList.remove('laser')
                        quadrado[indexLaserAtual].classList.remove(lvlInvasor)
                        quadrado[indexLaserAtual].classList.add('explosao')
                        
                        setTimeout(() => quadrado[indexLaserAtual].classList.remove('explosao'), 250)
                        clearInterval(laserId)
                    
                        const alienAbatido = aliensInvasores.indexOf(indexLaserAtual)
                        aliensAbatidos.push(alienAbatido)
                        resultado++
                        resultadoMostrado.innerHTML = resultado
                    }
                
                    if(indexLaserAtual < largura){
                        clearInterval(laserId)
                        setTimeout(() => quadrado[indexLaserAtual].classList.remove('laser'), 100)
                    }
                }
            
                switch(e.keyCode){
                    case 38:
                        laserId = setInterval(moverLaser, 100)
                        break
                }
            }
            
            document.addEventListener('keyup', atirar)
        }
    })