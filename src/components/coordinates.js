function init () {
    start = '62.132648, 77.463929'; // Стартовые координаты
    zoom = 14;                      // Зум при старте
    id = 'map';    
    start = start.split(',');       // разделим координаты на массив

    lat = start[0];
    long = start[1];
    coords = [lat, long];
    let Map = new ymaps.Map(id, {    // Инициализируем карту
        center: coords,
        type: 'yandex#hybrid',
        zoom: zoom,
        controls: ['zoomControl']
    });
    
    /* Добавим метку */
    mark = new ymaps.Placemark([lat, long],{}, {preset: "islands#redCircleDotIcon", draggable: true});
    Map.geoObjects.add(mark);

    /* И сделаем плавающей */
    mark.events.add("dragend", function () {
        coords = this.geometry.getCoordinates();
        save();
    }, mark);

    /* Эвэнт клик */
    Map.events.add('click', function (e) {
        coords = e.get('coords');
        save();
    });
}

/* Сохраняем */
function save (){
    var new_coords = [coords[0].toFixed(6), coords[1].toFixed(6)];
    mark.getOverlaySync().getData().geometry.setCoordinates(new_coords);
    document.getElementById("coordinates").value = new_coords;
}

/* Инициализируем образ карты */
ymaps.ready(init);