var locations = [
  ["Невский центр", "ст. м. «Пл. Восстания», Невский пр. 114-116", "Ежедневно с 10:00 до 23:00", ['images/content/img_2.jpg', 'images/content/img_3.jpg'], 59.901342, 30.288938],
  ["Фрунзенский центр", "ст. м. «Фрунзенская», Фрунзенская пр. 9", "Ежедневно с 11:00 до 22:00", ['images/content/img_8.jpg'], 59.859902, 30.287653]
];

var mapContainer = document.querySelector('.map-container'); // блок карты

var mapPopup = document.querySelector('template').content.querySelector('.map-popup-container'); // выбираем шаблон для попапа

var body = document.querySelector('body');

// функция отрисовки попапа принимает массив данных и id для выбора элемента из массива
var drawPopup = function (locations, i) {
  // создаем фрагмент
  var fragment = document.createDocumentFragment();
  // копируем разметку
  var element = mapPopup.cloneNode(true);
  // пишем заголовок
  element.querySelector('.map-popup__title').textContent = locations[i][0];
  // пишем адрес
  element.querySelector('.map-popup__address').textContent = locations[i][1];
  // пишем время
  element.querySelector('.map-popup__time').textContent = locations[i][2];
  //перебираем картинки и вставляем
  var picturesList = element.querySelector('.map-popup__pictures-list');
  // перебираем массив с картинками и рисуем блоки
  var photoFragment = document.createDocumentFragment();
  locations[i][3].forEach(function (photo, i) {
    var photoElement = document.querySelector('template').content.querySelector('.map-popup__pictures-list img').cloneNode(true);
    photoElement.src = photo;
    if(i == 0) {
      photoElement.classList.add("is-active");
    }
    photoFragment.appendChild(photoElement);
  });
  element.querySelector('.map-popup__pictures-list').innerHTML = '';
  element.querySelector('.map-popup__pictures-list').appendChild(photoFragment);
  // вставляем новую разметку в фрагмент
  fragment.appendChild(element);
  // возвращаем фрагмент
  return fragment;
};

var slideIndex = 1; //Индекс слайда по умолчанию

//функция для слайдера карттнок
function popupSlider() {
  //переключаем видимость блока с кнопками листалки картинок
  var buttons = document.querySelector('.map-popup__pictures-buttons');
  buttons.classList.remove("is-active");
  var imagesCount = document.querySelector('.map-popup__pictures-list').getElementsByTagName('img').length;
  if(imagesCount > 1) {
    buttons.classList.add("is-active");
  } else {
    buttons.classList.remove("is-active");
  }
  //переключение каритнки
  showSlides(slideIndex);
}

/* Функция увеличивает индекс на 1, показывает следующй слайд*/
function plusSlide() {
  showSlides(slideIndex += 1);
}

/* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
function minusSlide() {
  showSlides(slideIndex -= 1);
}

/* Устанавливает текущий слайд */
function currentSlide(n) {
  showSlides(slideIndex = n);
}

/* Основная функция слайдера */
function showSlides(n) {
  var i;
  var slides = document.querySelector('.map-popup__pictures-list').getElementsByTagName('img');
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.remove("is-active");
  }
  slides[slideIndex - 1].classList.add("is-active");
}

var activeMarker;

var icon_default = "images/icons/default_pin.svg";
var icon_active = "images/icons/active_pin.svg";

//инициализация карты и связанные с ней функции
function initContactsMap() {
  //настройки вида карты
  var stylesArray = [
    {
      "featureType": "administrative",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#444444"
      }]
    },
    {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [{
        "color": "#f2f2f2"
      }]
    },
    {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "road",
      "elementType": "all",
      "stylers": [{
          "saturation": -100
        },
        {
          "lightness": 45
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "all",
      "stylers": [{
        "visibility": "simplified"
      }]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "water",
      "elementType": "all",
      "stylers": [{
          "color": "#dedee4"
        },
        {
          "visibility": "on"
        }
      ]
    }
  ];

  var bounds = new google.maps.LatLngBounds();

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    scrollwheel: false,
    zoomControl: true,
    scaleControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    styles: stylesArray
  });

  var icon = {
    url: icon_default,
    scaledSize: new google.maps.Size(50, 50),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(25, 25)
  };

  var marker, i;

  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][4], locations[i][5]),
      map: map,
      draggable: false,
      icon: icon
    });

    bounds.extend(marker.position);

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        //удаляем ранее нарисованный попап
        var openedPopup = mapContainer.querySelector('.map-popup-container');
        if (openedPopup !== null) {
          mapContainer.removeChild(openedPopup);
        }
        //рисуем и вставляем попап
        body.classList.add("open-map-popup");
        var popup = drawPopup(locations, i);
        mapContainer.insertBefore(popup, mapContainer.querySelector('.map'));

        //закрытие по клику на кнопку закрытия
        var popupCloser = mapContainer.querySelector('.map-popup__close');
        popupCloser.addEventListener('click', mapPopupClose);

        //устанавливаем маркер по центру
        map.setCenter(marker.position);
        //показываем листалку картинок
        popupSlider();
        //смена иконки активного маркера
        activeMarker && activeMarker.setIcon(icon_default);
        marker.setIcon(icon_active);
        activeMarker = marker;
      }
    })(marker, i));
  }

  map.fitBounds(bounds);
}

function mapPopupClose() {
  body.classList.remove("open-map-popup");
  var openedPopup = mapContainer.querySelector('.map-popup-container');
  if (openedPopup !== null) {
    mapContainer.removeChild(openedPopup);
  }
  activeMarker.setIcon(icon_default);
}
