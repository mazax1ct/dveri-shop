$(document).ready(function () {
  //слайдер на главной
  if ($('.js-slider').length) {
    $('.js-slider').slick({
      auto: false,
      mobileFirst: true,
      slidesToShow: 1,
      infinite: true,
      arrows: true,
      prevArrow: '<button type="button" class="slick-prev slick-arrow" title="Назад"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#slider_arrow_left"/></svg></button>',
      nextArrow: '<button type="button" class="slick-next slick-arrow" title="Вперед"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#slider_arrow_right"/></svg></button>',
      appendArrows: $('.js-slider-nav'),
      dots: false
    });
  }

  //проверка на пустоту поля ввода при загрузке страницы
  $('.js-input').each(function() {
    if($(this).val()) {
      $(this).parent('.input-label').addClass('filled');
    }
  });

  //проверка на пустоту поля ввода
  $('.js-input').blur(function () {
    if($(this).val()) {
      $(this).parent('.input-label').addClass('filled');
    } else {
      $(this).parent('.input-label').removeClass('filled');
    }
  });

  
  $('.js-custom-scroll').each(function(index, element) {
    new SimpleBar(element, { autoHide: false })
  });
});

//открытие сайдбара
$(document).on('click', '.js-side-bar-opener', function () {
  $('body').addClass('overflow');
  $('.side-bar').addClass('is-open');
  document.addEventListener('click', closeSideBar); //подписка на событие
  return false;
});

//закрытие сайдбара по крестику
$(document).on('click', '.js-side-bar-close', function () {
  $('.side-bar').removeClass('is-open');
  $('body').removeClass('overflow');
  document.removeEventListener('click', closeSideBar); //отписываемся от события
  return false;
});

//функция закрытия сайдбара
function closeSideBar(evt) {
  if (!$('.side-bar__inner').is(evt.target) && $('.side-bar__inner').has(evt.target).length === 0) {
    $('.side-bar').removeClass('is-open');
    $('body').removeClass('overflow');
    document.removeEventListener('click', closeSideBar); //отписываемся от события
	}
}

//открытие поиска
$(document).on('click', '.js-search-opener', function () {
  $('.search-bar').toggleClass('is-open');
  $('.search-bar__input').focus();
  return false;
});

//открытие/закрытие меню в футере
$(document).on('click', '.js-footer-menu-opener', function () {
  if($('body').width() < 768) {
    $(this).toggleClass('is-open');
    $(this).next('.footer-menu').slideToggle();
    return false;
  }
});
