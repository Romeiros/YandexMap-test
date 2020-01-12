import { Component, OnInit } from '@angular/core';

declare var ymaps:any;

@Component({
  selector: 'app-yandex-map',
  templateUrl: './yandex-map.component.html',
  styleUrls: ['./yandex-map.component.scss']
})
export class YandexMapComponent implements OnInit {

  public map :any;

  placemarks = [
    {
      latitude: 59.97,
      longitude: 30.31,
      hintContent: '<div class="map__hint">ул. Литераторов, д. 19</div>',
      balloonContent: [
        '<div class="map__balloon">',
        '<img class="map__burger-img" src="assets/burger.png" alt="Бургер"/>',
        'Самые вкусные бургеры у нас! Заходите по адресу: ул. Литераторов, д. 19',
        '</div>'
      ]
    },
    {
      latitude: 59.94,
      longitude: 30.25,
      hintContent: '<div class="map__hint">Малый проспект В О, д 64</div>',
      balloonContent: [
        '<div class="map__balloon">',
        '<img class="map__burger-img" src="assets/burger.png" alt="Бургер"/>',
        'Самые вкусные бургеры у нас! Заходите по адресу: Малый проспект В О, д 64',
        '</div>'
      ]
    },
    {
      latitude: 59.93,
      longitude: 30.34,
      hintContent: '<div class="map__hint">наб. реки Фонтанки, д. 56</div>',
      balloonContent: [
        '<div class="map__balloon">',
        '<img class="map__burger-img" src="assets/burger.png" alt="Бургер"/>',
        'Самые вкусные бургеры у нас! Заходите по адресу: наб. реки Фонтанки, д. 56',
        '</div>'
      ]
    }
  ];

  geoObjects= [];

  constructor() { }

  ngOnInit() {

    ymaps.ready().then(() => {
      this.map = new ymaps.Map('map', {
        center: [59.94, 30.32],
        zoom: 12,
        controls: ['zoomControl'],
        behaviors: ['drag']
      });

      for (var i = 0; i < this.placemarks.length; i++) {
        this.geoObjects[i] = new ymaps.Placemark([this.placemarks[i].latitude, this.placemarks[i].longitude],
          {
            hintContent: this.placemarks[i].hintContent,
            balloonContent: this.placemarks[i].balloonContent.join('')
          },
          {
            iconLayout: 'default#image',
            iconImageHref: 'assets/map-marker.png',
            iconImageSize: [46, 57],
            iconImageOffset: [-23, -57],
            iconImageClipRect: [[415, 0], [461, 57]]
          });
      }

      var clusterer = new ymaps.Clusterer({
        clusterIcons: [
          {
            href: 'assets/burger.png',
            size: [100, 100],
            offset: [-50, -50]
          }
        ],
        clusterIconContentLayout: null
      });

      this.map.geoObjects.add(clusterer);
      clusterer.add(this.geoObjects);

      // Создаем ломаную.
      var myPolyline = new ymaps.Polyline([
        // Указываем координаты вершин.
        [59.97, 30.31],
        [59.94, 30.25],
        [59.93, 30.34]
      ], { }, {
        // Задаем опции геообъекта.
        // Цвет с прозрачностью.
        strokeColor: "#00000088",
        // Ширину линии.
        strokeWidth: 4,
        // Максимально допустимое количество вершин в ломаной.
        // editorMaxPoints: 6,
        // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
        editorMenuManager: function (items) {
          items.push({
            title: "Удалить линию",
            onClick: function () {
              this.map.geoObjects.remove(myPolyline);
            }
          });
          return items;
        }
      });

      // Добавляем линию на карту.
      this.map.geoObjects.add(myPolyline);

      // Включаем режим редактирования.
      // myPolyline.editor.startEditing();

    });

  }

}
