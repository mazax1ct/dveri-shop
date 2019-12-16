function formatState (state) {
  if (!state.id) {
    return state.text;
  }
  var $state = $(
    '<span><span class="text">'+ state.text +'</span><svg class="sorting-icon" aria-hidden="true"><use xlink:href="#'+ state.element.className +'" /></svg></span>'
  );
  $state.find(".text").text(state.text);
  return $state;
};

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

  //кастомный скролл
  $('.js-custom-scroll').each(function(index, element) {
    new SimpleBar(element, { autoHide: false })
  });

  //кастомный скролл и слайдеры блоков на главной
  if($('body').width() < 1200) {
    $('.js-custom-scroll-mobile').each(function(index, element) {
      new SimpleBar(element, { autoHide: false })
    });
  } else {
    //слайдер каталога
    if ($('.js-catalog-slider_1').length) {
      $('.js-catalog-slider_1').slick({
        auto: false,
        mobileFirst: true,
        slidesToShow: 4,
        infinite: false,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev slick-arrow" title="Назад"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#slider_arrow_left"/></svg></button>',
        nextArrow: '<button type="button" class="slick-next slick-arrow" title="Вперед"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#slider_arrow_right"/></svg></button>',
        appendArrows: $('.js-catalog-nav_1'),
        dots: false,
        responsive: [
          {
            breakpoint: 1500,
            settings: {
              slidesToShow: 5
            }
          },
        ]
      });
    }

    if ($('.js-catalog-slider_2').length) {
      $('.js-catalog-slider_2').slick({
        auto: false,
        mobileFirst: true,
        slidesToShow: 4,
        infinite: false,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev slick-arrow" title="Назад"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#slider_arrow_left"/></svg></button>',
        nextArrow: '<button type="button" class="slick-next slick-arrow" title="Вперед"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#slider_arrow_right"/></svg></button>',
        appendArrows: $('.js-catalog-nav_2'),
        dots: false,
        responsive: [
          {
            breakpoint: 1500,
            settings: {
              slidesToShow: 5
            }
          },
        ]
      });
    }

    //слайдер отзывов
    if ($('.js-reviews-slider').length) {
      $('.js-reviews-slider').slick({
        auto: false,
        mobileFirst: true,
        slidesToShow: 3,
        infinite: false,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev slick-arrow" title="Назад"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#slider_arrow_left"/></svg></button>',
        nextArrow: '<button type="button" class="slick-next slick-arrow" title="Вперед"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#slider_arrow_right"/></svg></button>',
        appendArrows: $('.js-reviews-nav'),
        dots: false
      });
    }

    //слайдер новостей
    if ($('.js-news-slider').length) {
      $('.js-news-slider').slick({
        auto: false,
        mobileFirst: true,
        slidesToShow: 3,
        infinite: false,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev slick-arrow" title="Назад"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#slider_arrow_left"/></svg></button>',
        nextArrow: '<button type="button" class="slick-next slick-arrow" title="Вперед"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#slider_arrow_right"/></svg></button>',
        appendArrows: $('.js-news-nav'),
        dots: false,
        responsive: [
          {
            breakpoint: 1500,
            settings: {
              slidesToShow: 4
            }
          },
        ]
      });
    }

    //слайдер сертификатов
    if ($('.js-sertificates-slider').length) {
      $('.js-sertificates-slider').slick({
        auto: false,
        mobileFirst: true,
        slidesToShow: 5,
        infinite: false,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev slick-arrow" title="Назад"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#slider_arrow_left"/></svg></button>',
        nextArrow: '<button type="button" class="slick-next slick-arrow" title="Вперед"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#slider_arrow_right"/></svg></button>',
        appendArrows: $('.js-sertificates-nav'),
        dots: false,
        responsive: [
          {
            breakpoint: 1500,
            settings: {
              slidesToShow: 6
            }
          },
        ]
      });
    }
  }

  //слайдер картинок на деталке товара
  if ($('.js-product-images').length) {
    $('.js-product-images').slick({
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.js-product-images-nav',
      dots: false,
      auto: false,
      mobileFirst: true
    });

    $('.js-product-images-nav').slick({
      infinite: false,
      vertical: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.js-product-images',
      dots: false,
      focusOnSelect: true,
      mobileFirst: true,
      prevArrow: '<button type="button" class="slick-prev slick-arrow" title="Назад"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#arrow_down"/></svg></button>',
      nextArrow: '<button type="button" class="slick-next slick-arrow" title="Вперед"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#arrow_up"/></svg></button>'
    });
  }

  //слайдер цены
  if ($('.js-price-slider').length) {
    var min = 4900;
    var max = 28000;
    $(".js-price-slider").ionRangeSlider({
      skin: "round",
      type: "double",
      min: min,
      max: max,
      from: min,
      to: max,
      grid: false,
      hide_min_max: true,
      hide_from_to: true,
      onChange: function (data) {
        $('#min').val(data.from);
        $('#max').val(data.to);
      }
    });

    var price_range = $(".js-price-slider").data("ionRangeSlider");

    $('#min, #max').on('change', function() {
      price_range.update({
        from: $('#min').val(),
          to: $('#max').val()
      });

      if($('#min').val() < min ) {
        price_range.update({
          from: $('#min').val(min)
        });
      }

      if($('#max').val() < min ) {
        price_range.update({
          from: $('#max').val(min)
        });
      }

      if($('#max').val() > max ) {
        price_range.update({
          from: $('#max').val(max)
        });
      }
    });
  }

  //кастомный селект
  $(".js-select").select2({
    containerCssClass: 'sorting-select',
    dropdownCssClass: 'sorting-select',
    minimumResultsForSearch: Infinity,
    templateResult: formatState,
    templateSelection: formatState,
    dropdownParent: $('.select')
  });
});

//открытие сайдбара
$(document).on('click', '.js-side-bar-opener', function () {
  $('body').addClass('overflow');
  $('.side-bar').addClass('is-open');
  document.addEventListener('click', closeSideBar); //подписка на событие
  document.addEventListener('keydown', onSideBarEscPress);
  return false;
});

//закрытие сайдбара по крестику
$(document).on('click', '.js-side-bar-close', function () {
  $('.side-bar').removeClass('is-open');
  $('body').removeClass('overflow');
  document.removeEventListener('click', closeSideBar); //отписываемся от события
  document.removeEventListener('keydown', onSideBarEscPress);
  return false;
});

//функция закрытия сайдбара
function closeSideBar(evt) {
  if (!$('.side-bar__inner').is(evt.target) && $('.side-bar__inner').has(evt.target).length === 0) {
    $('.side-bar').removeClass('is-open');
    $('body').removeClass('overflow');
    document.removeEventListener('click', closeSideBar); //отписываемся от события
    document.removeEventListener('keydown', onSideBarEscPress);
	}
}

// функция для обработчика нажатия Esc в открытом сайдбаре
var onSideBarEscPress = function (evt) {
  if (evt.keyCode === 27) {
    closeSideBar(evt);
  }
};

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

//переключение каталога на главной
$(document).on('click', '.js-catalog-switch', function () {
  $('.js-catalog-switch').removeClass('is-active');
  $(this).addClass('is-active');
  $('.catalog-block__item').removeClass('is-active');
  $('.catalog-block__item[data-target="'+ $(this).attr('data-href') +'"]').addClass('is-active');
  $('.title-block__nav-inner').removeClass('is-active');
  $('.title-block__nav-inner[data-target="'+ $(this).attr('data-href') +'"]').addClass('is-active');
  if($('body').width() > 1199) {
    $('.js-catalog-slider_1').slick('setPosition');
    $('.js-catalog-slider_2').slick('setPosition');
  }
  return false;
});

//открытие/закрытие секции фильтра
$(document).on('click', '.js-filter-section-opener', function () {
  $(this).toggleClass('is-open');
  $(this).next('.filter__section-inner').slideToggle(300, function() {
    $(this).toggleClass('is-open');
  });
  return false;
});

$(document).on('click', '.js-filter-opener', function () {
  $('body').addClass('overflow');
  $('.filter').addClass('is-open');
  return false;
});
