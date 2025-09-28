

(function() {
  "use strict";

  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);


  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }


  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });


  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });


  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      // Aguarda 5 segundos (duração da animação) antes de remover o preloader
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s ease-out';
        setTimeout(() => {
          preloader.remove();
        }, 500);
      }, 5000);
    });
  }


  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);


  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

 
  const glightbox = GLightbox({
    selector: '.glightbox'
  });


  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });


  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });


  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });


  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);


  function verificarHorarioAtendimento() {
    const agora = new Date();
    const diaAtual = agora.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
    const horaAtual = agora.getHours();
    const minutoAtual = agora.getMinutes();
    const horaCompleta = horaAtual + (minutoAtual / 60);

    let statusAtendimento = {
      aberto: false,
      mensagem: '',
      proximoAtendimento: ''
    };

    // Segunda a Sexta (1-5): 08h às 18h
    if (diaAtual >= 1 && diaAtual <= 5) {
      if (horaCompleta >= 8 && horaCompleta < 18) {
        statusAtendimento.aberto = true;
        statusAtendimento.mensagem = '🟢 Estamos ABERTOS!';
        statusAtendimento.proximoAtendimento = `Atendimento até às 18h00`;
      } else {
        statusAtendimento.aberto = false;
        statusAtendimento.mensagem = '🔴 Estamos FECHADOS';
        if (horaCompleta < 8) {
          statusAtendimento.proximoAtendimento = 'Abriremos hoje às 08h00';
        } else {
          const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
          const proximoDia = diaAtual === 5 ? 'Sábado às 08h00' : 'amanhã às 08h00';
          statusAtendimento.proximoAtendimento = `Abriremos ${proximoDia}`;
        }
      }
    }
    // Sábado (6): 08h às 12h
    else if (diaAtual === 6) {
      if (horaCompleta >= 8 && horaCompleta < 12) {
        statusAtendimento.aberto = true;
        statusAtendimento.mensagem = '🟢 Estamos ABERTOS!';
        statusAtendimento.proximoAtendimento = `Atendimento até às 12h00`;
      } else {
        statusAtendimento.aberto = false;
        statusAtendimento.mensagem = '🔴 Estamos FECHADOS';
        if (horaCompleta < 8) {
          statusAtendimento.proximoAtendimento = 'Abriremos hoje às 08h00';
        } else {
          statusAtendimento.proximoAtendimento = 'Abriremos na Segunda-feira às 08h00';
        }
      }
    }
    // Domingo (0): Fechado
    else {
      statusAtendimento.aberto = false;
      statusAtendimento.mensagem = '🔴 Estamos FECHADOS';
      statusAtendimento.proximoAtendimento = 'Abriremos na Segunda-feira às 08h00';
    }

    return statusAtendimento;
  }

  function mostrarPopupAtendimento() {
    const status = verificarHorarioAtendimento();
    
    // Criar o popup
    const popup = document.createElement('div');
    popup.id = 'horario-popup';
    popup.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      animation: fadeIn 0.4s ease-out;
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);
    `;

    const popupContent = document.createElement('div');
    popupContent.style.cssText = `
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
      text-align: center;
      max-width: 420px;
      width: 90%;
      animation: slideIn 0.4s ease-out;
      transform: translateZ(0);
      backface-visibility: hidden;
      will-change: transform, opacity;
    `;

    const corStatus = status.aberto ? '#28a745' : '#dc3545';
    const iconStatus = status.aberto ? '🕐' : '⏰';

    popupContent.innerHTML = `
      <div style="font-size: 3rem; margin-bottom: 15px;">${iconStatus}</div>
      <h3 style="color: ${corStatus}; margin-bottom: 15px; font-weight: 600;">
        ${status.mensagem}
      </h3>
      <p style="margin-bottom: 10px; color: #6c757d; font-size: 1rem;">
        <strong>Horário de Atendimento:</strong><br>
        Segunda a Sexta: 08h às 18h<br>
        Sábados: 08h às 12h<br>
        Domingos: Fechado
      </p>
      <p style="margin-bottom: 25px; color: #495057; font-weight: 600;">
        ${status.proximoAtendimento}
      </p>
      <button id="fechar-popup" style="
        background: linear-gradient(45deg, #007bff, #0056b3);
        color: white;
        border: none;
        padding: 12px 25px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        font-size: 1rem;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
      " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0, 123, 255, 0.4)'" 
         onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0, 123, 255, 0.3)'">
        OK, Entendi
      </button>
    `;

    // Adicionar animações CSS
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideIn {
        from { transform: translateY(-30px) scale(0.9); opacity: 0; }
        to { transform: translateY(0) scale(1); opacity: 1; }
      }
      #horario-popup {
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        transform: translateZ(0);
        -webkit-transform: translateZ(0);
      }
    `;
    document.head.appendChild(style);

    popup.appendChild(popupContent);
    document.body.appendChild(popup);

    // Função para fechar popup de forma suave
    function fecharPopup() {
      popup.style.animation = 'fadeOut 0.3s ease-out forwards';
      popup.style.pointerEvents = 'none'; // Previne cliques duplos
      setTimeout(() => {
        if (document.body.contains(popup)) {
          document.body.removeChild(popup);
        }
      }, 300);
    }

    // Fechar popup
    document.getElementById('fechar-popup').addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      fecharPopup();
    });

    // Fechar ao clicar fora do popup
    popup.addEventListener('click', function(e) {
      if (e.target === popup) {
        e.preventDefault();
        e.stopPropagation();
        fecharPopup();
      }
    });

    // Adicionar animação de saída
    style.textContent += `
      @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.95); }
      }
    `;
  }

  // Mostrar popup após o preloader ser removido
  window.addEventListener('load', function() {
    setTimeout(() => {
      mostrarPopupAtendimento();
    }, 5500); // Aguarda o preloader + 500ms
  });

})();

