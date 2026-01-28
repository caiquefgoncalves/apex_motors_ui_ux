document.addEventListener('DOMContentLoaded', function() {
    

    const hamburguer = document.getElementById('hamburguer');
    const menuNavegacao = document.getElementById('menu-navegacao');
    const linksMenu = document.querySelectorAll('.link-menu');
    const formularioContato = document.getElementById('formulario-contato');
    const anoAtual = document.getElementById('ano-atual');
    
   
    if (hamburguer) {
        hamburguer.addEventListener('click', function() {
          
            hamburguer.classList.toggle('ativo');
            menuNavegacao.classList.toggle('ativo');
            
            
            if (menuNavegacao.classList.contains('ativo')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }
    

    linksMenu.forEach(link => {
        link.addEventListener('click', function() {
        
            hamburguer.classList.remove('ativo');
            menuNavegacao.classList.remove('ativo');
            document.body.style.overflow = 'auto';
            
    
            linksMenu.forEach(item => item.classList.remove('ativo'));
            

            this.classList.add('ativo');
        });
    });
    

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                
                const headerHeight = document.querySelector('.cabecalho').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
   
    if (formularioContato) {
        formularioContato.addEventListener('submit', function(e) {
            e.preventDefault();
            
           
            const dadosFormulario = new FormData(this);
            const dados = Object.fromEntries(dadosFormulario);
            
            
            if (!dados.nome || !dados.email || !dados.assunto || !dados.mensagem) {
                mostrarMensagem('Por favor, preencha todos os campos obrigatórios.', 'erro');
                return;
            }
            
      
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(dados.email)) {
                mostrarMensagem('Por favor, insira um e-mail válido.', 'erro');
                return;
            }
            
            
            simularEnvioFormulario(dados);
        });
    }
    

    function mostrarMensagem(texto, tipo = 'sucesso') {
       
        const mensagemAnterior = document.querySelector('.mensagem-flutuante');
        if (mensagemAnterior) {
            mensagemAnterior.remove();
        }
        
     
        const mensagem = document.createElement('div');
        mensagem.className = `mensagem-flutuante ${tipo}`;
        mensagem.innerHTML = `
            <div class="conteudo-mensagem">
                <i class="fas fa-${tipo === 'sucesso' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${texto}</span>
            </div>
        `;
        
        
        mensagem.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 4px;
            background-color: ${tipo === 'sucesso' ? '#d4edda' : '#f8d7da'};
            color: ${tipo === 'sucesso' ? '#155724' : '#721c24'};
            border: 1px solid ${tipo === 'sucesso' ? '#c3e6cb' : '#f5c6cb'};
            z-index: 10000;
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
            animation: slideIn 0.3s ease;
        `;
        
        
        mensagem.querySelector('.conteudo-mensagem').style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        
        document.body.appendChild(mensagem);
        
        
        setTimeout(() => {
            if (mensagem.parentNode) {
                mensagem.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    if (mensagem.parentNode) {
                        mensagem.remove();
                    }
                }, 300);
            }
        }, 5000);
        
       
        if (!document.querySelector('#animacoes-mensagem')) {
            const style = document.createElement('style');
            style.id = 'animacoes-mensagem';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    
    function simularEnvioFormulario(dados) {
        
        const botaoEnviar = formularioContato.querySelector('button[type="submit"]');
        const textoOriginal = botaoEnviar.textContent;
        botaoEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        botaoEnviar.disabled = true;
        
       
        setTimeout(() => {
           
            mostrarMensagem('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'sucesso');
            
            
            formularioContato.reset();
            
            
            botaoEnviar.textContent = textoOriginal;
            botaoEnviar.disabled = false;
            
           
            console.log('Formulário enviado:', dados);
        }, 2000);
    }
    
    
    if (anoAtual) {
        anoAtual.textContent = new Date().getFullYear();
    }
    
    
    const cartoesVeiculo = document.querySelectorAll('.cartao-veiculo');
    cartoesVeiculo.forEach(cartao => {
        cartao.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
    
   
    const botoes = document.querySelectorAll('.botao');
    botoes.forEach(botao => {
        botao.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.12)';
            }
        });
        
        botao.addEventListener('mouseleave', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            }
        });
    });
    
    
    document.addEventListener('keydown', function(e) {
       
        if (e.key === 'Escape') {
            if (menuNavegacao.classList.contains('ativo')) {
                hamburguer.classList.remove('ativo');
                menuNavegacao.classList.remove('ativo');
                document.body.style.overflow = 'auto';
            }
        }
        
      
        if (menuNavegacao.classList.contains('ativo')) {
            if (e.key === 'Tab') {
                const elementosFocaveis = menuNavegacao.querySelectorAll('a, button, input, select, textarea');
                const primeiroElemento = elementosFocaveis[0];
                const ultimoElemento = elementosFocaveis[elementosFocaveis.length - 1];
                
                if (e.shiftKey && document.activeElement === primeiroElemento) {
                    e.preventDefault();
                    ultimoElemento.focus();
                } else if (!e.shiftKey && document.activeElement === ultimoElemento) {
                    e.preventDefault();
                    primeiroElemento.focus();
                }
            }
        }
    });
    
   
    function atualizarMenuAtivo() {
        const secoes = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100; 
        
        secoes.forEach(secao => {
            const secaoTop = secao.offsetTop;
            const secaoBottom = secaoTop + secao.offsetHeight;
            const secaoId = secao.getAttribute('id');
            
            if (scrollPos >= secaoTop && scrollPos < secaoBottom) {
                linksMenu.forEach(link => {
                    link.classList.remove('ativo');
                    if (link.getAttribute('href') === `#${secaoId}`) {
                        link.classList.add('ativo');
                    }
                });
            }
        });
    }
    
   
    window.addEventListener('scroll', atualizarMenuAtivo);
    
   
    atualizarMenuAtivo();
    
  
    console.log('Site Apex Motors carregado com sucesso!');
});