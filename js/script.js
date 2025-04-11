document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const menu = document.querySelector('.menu');
    
    if (mobileMenuIcon) {
        mobileMenuIcon.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menu.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Tabs de cursos
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const target = this.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });
    
    // Slider de docentes
    const docentesSlider = document.querySelector('.docentes-slider');
    const docenteCards = document.querySelectorAll('.docente-card');
    const prevBtn = document.getElementById('prev-docente');
    const nextBtn = document.getElementById('next-docente');
    
    if (docentesSlider && docenteCards.length > 0) {
        let currentIndex = 0;
        const cardWidth = docenteCards[0].offsetWidth;
        const cardMargin = 30; // Gap entre os cards
        const visibleCards = getVisibleCards();
        
        function getVisibleCards() {
            const sliderWidth = docentesSlider.offsetWidth;
            return Math.floor(sliderWidth / (cardWidth + cardMargin));
        }
        
        function updateSlider() {
            const maxIndex = docenteCards.length - visibleCards;
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            if (currentIndex < 0) currentIndex = 0;
            
            docentesSlider.style.transform = `translateX(-${currentIndex * (cardWidth + cardMargin)}px)`;
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentIndex--;
                updateSlider();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentIndex++;
                updateSlider();
                
            });
        }
        
        // Atualiza o slider quando a janela é redimensionada
        window.addEventListener('resize', function() {
            docentesSlider.style.transition = 'none';
            const newVisibleCards = getVisibleCards();
            if (newVisibleCards !== visibleCards) {
                currentIndex = 0;
                updateSlider();
            }
            setTimeout(() => {
                docentesSlider.style.transition = 'transform 0.3s ease';
            }, 50);
        });
        
        // Inicializa o slider
        docentesSlider.style.transition = 'transform 0.3s ease';
    }
    
    // Formulário de contato
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio de formulário
            const formData = new FormData(contactForm);
            const formValues = {};
            
            formData.forEach((value, key) => {
                formValues[key] = value;
            });
            
            // Aqui você adicionaria o código para enviar os dados para um servidor
            console.log('Formulário enviado:', formValues);
            
            // Feedback visual
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Mensagem Enviada!';
            submitBtn.style.backgroundColor = 'var(--success-color)';
            submitBtn.disabled = true;
            
            // Reset do formulário após 3 segundos
            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 3000);
        });
    }
    
    // Animação de scroll suave para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animação de elementos ao scroll
    const animateElements = document.querySelectorAll('.section-header, .destaque-item, .curso-card, .docente-card, .evento-card, .news-item');
    
    function checkScroll() {
        animateElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.9) {
                el.classList.add('animate');
            }
        });
    }
    
    // Inicializa a verificação
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Verifica elementos visíveis no carregamento inicial
});