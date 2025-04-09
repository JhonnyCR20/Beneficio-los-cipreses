// Script principal para Beneficio Los Cipreses

document.addEventListener('DOMContentLoaded', function() {
    // Función para inicializar el cambio de tema
    const themeSwitch = document.getElementById('theme-switch');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Establecer el tema inicial basado en la preferencia guardada
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Actualizar el estado del interruptor según el tema actual
    if (currentTheme === 'dark') {
        themeSwitch.checked = true;
        updateLogoForTheme('dark');
    } else {
        updateLogoForTheme('light');
    }
    
    // Manejar el cambio de tema cuando se hace clic en el interruptor
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateLogoForTheme('dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            updateLogoForTheme('light');
        }
    });
    
    // Función para actualizar el logo según el tema
    function updateLogoForTheme(theme) {
        const footerLogo = document.querySelector('.footer-logo');
        if (footerLogo) {
            if (theme === 'dark') {
                footerLogo.src = 'img/logo claro.png';
            } else {
                footerLogo.src = 'img/logo obscuro.png';
            }
        }
    }
    
    // Función para inicializar las miniaturas del carrusel
    function initCarouselThumbnails() {
        const carouselId = 'carouselNosotros';
        const carousel = document.getElementById(carouselId);
        
        // Si no existe el carrusel en la página actual, salir de la función
        if (!carousel) return;
        
        const thumbnails = document.querySelectorAll('.thumbnail-item');
        
        // Añadir evento click a cada miniatura
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Obtener el índice del slide al que se quiere ir
                const slideIndex = this.getAttribute('data-bs-slide-to');
                
                // Actualizar la clase active en las miniaturas
                thumbnails.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
                
                // Cambiar al slide correspondiente usando la API de Bootstrap
                const bsCarousel = bootstrap.Carousel.getInstance(carousel);
                bsCarousel.to(parseInt(slideIndex));
            });
        });
        
        // Actualizar la miniatura activa cuando cambia el carrusel
        carousel.addEventListener('slide.bs.carousel', function(event) {
            const slideIndex = event.to;
            
            // Actualizar la clase active en las miniaturas
            thumbnails.forEach((item, index) => {
                if (index === slideIndex) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        });
    }
    
    // Inicializar el carrusel si existe en la página
    initCarouselThumbnails();
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.backgroundColor = 'rgba(60, 47, 47, 1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.backgroundColor = 'rgba(60, 47, 47, 0.9)';
        }
    });
    
    // Smooth scrolling SOLO para links internos que comienzan con #
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Solo interceptar enlaces que son exactamente anclas internas
            const href = this.getAttribute('href');
            
            // Asegurarse de que sea un enlace interno puro (solo comienza con # y no contiene .html)
            if (href.startsWith('#') && !href.includes('.html')) {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                    
                    // Actualizar clase active en navbar
                    document.querySelectorAll('.nav-link').forEach(navLink => {
                        navLink.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            }
            // Los enlaces a otras páginas HTML funcionarán normalmente
        });
    });

    
    // Activar link de navbar según la sección visible o la página actual
    function setActiveNavLink() {
        // Obtener la página actual del pathname
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Remover la clase active de todos los enlaces
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        
        // Establecer active en el enlace correspondiente a la página actual
        document.querySelectorAll('.nav-link').forEach(navLink => {
            const navHref = navLink.getAttribute('href');
            if (navHref === currentPage) {
                navLink.classList.add('active');
            }
        });
    }
    
    // Ejecutar al cargar la página
    setActiveNavLink();
    
    // Ejecutar al hacer scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        setActiveNavLink();
        
        // Para enlaces internos dentro de la misma página
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom && sectionId) {
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    // Solo actualizar enlaces internos, no los de navegación principal
                    if (navLink.getAttribute('href') === '#' + sectionId) {
                        document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
                            link.classList.remove('active');
                        });
                        navLink.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Animación para elementos al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.process-card, .product-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Inicializar elementos con opacidad 0
    document.querySelectorAll('.process-card, .product-card, .testimonial-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Ejecutar animación al cargar y al hacer scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Validación simple del formulario de contacto
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí se podría implementar el envío del formulario a un servidor
            // Por ahora, solo mostramos un mensaje de éxito
            
            const formElements = contactForm.elements;
            let isValid = true;
            
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].hasAttribute('required') && !formElements[i].value) {
                    isValid = false;
                    formElements[i].classList.add('is-invalid');
                } else {
                    formElements[i].classList.remove('is-invalid');
                }
            }
            
            if (isValid) {
                // Crear un mensaje de éxito
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.';
                
                // Insertar el mensaje después del formulario
                contactForm.parentNode.appendChild(successMessage);
                
                // Resetear el formulario
                contactForm.reset();
                
                // Eliminar el mensaje después de 5 segundos
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }
});