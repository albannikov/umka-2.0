# Проект пока в разработке 

## Как это работает 

<img src="https://raw.githubusercontent.com/albannikov/heartmap-v2/branch/src/img/screen1.jpg">
<img src="https://raw.githubusercontent.com/albannikov/heartmap-v2/branch/src/img/screen3.jpg">

# Yandex Maps API Heatmap Module

**Heatmap** - это графическое представление некоторых пространственных данных, где значения плотности обозначены разными цветами.
Класс `Heatmap` позволяет создавать и отображать такие представления поверх географических карт.


## Конструктор

| Parameter | Default value | Decription |
|---------|-----------------------|----------|
| data | - | Type: Object.<br>Points described using of following formats:<ul><li>Number[][] - coordinates array;</li><li>[IGeoObject](https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IGeoObject-docpage/) - object implementing `IGeoObject` interface;</li><li>[IGeoObject](https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IGeoObject-docpage/)[] - array of objects implementing `IGeoObject` interface;</li><li>[ICollection](https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ICollection-docpage/) - collection of objects implementing `IGeoObject` interface;</li><li>[ICollection](https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ICollection-docpage/)[] - array of collection of objects implementing `IGeoObject` interface;</li><li>[GeoQueryResult](https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoQueryResult-docpage/) - result of [geoQuery](https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geoQuery-docpage/) execution;</li><li>Any - JSON representation of data according to [GeoQueryResult](https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoQueryResult-docpage/) input data format.</li> |
|  options |  - | Type: Object.<br>Heatmap representation options. |
|  options.radius |  10 | Type: Number.<br>Point radius of influence (px). |
|  options.dissipating |  false | Type: Boolean.<br>`true` - disperse points on higher zoom levels according to radius, `false` - don't disperse. |
|  options.opacity |  0.8 | Type: Number.<br>Heatmap opacity (from&nbsp;0&nbsp;to&nbsp;1). |
|  options.intensityOfMidpoint |  0.2 | Type: Number.<br>Intensity of median point (from&nbsp;0&nbsp;to&nbsp;1). |
|  options.gradient | {<br>&nbsp;&nbsp;&nbsp;&nbsp;0.1:&nbsp;'rgba(128,&nbsp;255,&nbsp;0,&nbsp;0.7)',<br>&nbsp;&nbsp;&nbsp;&nbsp;0.2:&nbsp;'rgba(255,&nbsp;255,&nbsp;0,&nbsp;0.8)',<br>&nbsp;&nbsp;&nbsp;&nbsp;0.7:&nbsp;'rgba(234,&nbsp;72,&nbsp;58,&nbsp;0.9)',<br>&nbsp;&nbsp;&nbsp;&nbsp;1.0:&nbsp;'rgba(162,&nbsp;36,&nbsp;25,&nbsp;1)'<br>} | Type: Object.<br>JSON description of gradient. |

## Свойства

| Name| Type| Description|
|----|-----|----------|
| options | [option.Manager](https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/option.Manager-docpage/) | `Heatmap` instance options manager. |

## Методы

| Name| Returns | Description |
|----|------------|----------|
| [getData](#getdata) | Object&nbsp;&#124;&nbsp;null | Returns reference to data provided to constructor or [setData](#setdata) method. |
| [setData](#setdata) | Heatmap | Adds new points. If `Heatmap` instance is already rendered, it will be re-rendered. |
| [getMap](#getmap) |  Map&nbsp;&#124;&nbsp;null | Returns reference to [Map](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Map-docpage/) object. |
| [setMap](#setmap) |  Heatmap | Sets [Map](https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Map-docpage/) instance to render heatmap layer over it. |
| [destroy](#destroy) | - | Destroys `Heatmap` instance. |


### getData
ссылка на данные, предоставленные конструктору или методу [setData](#setdata).

### setData
Устанавливает точки. Если экземпляр `Heatmap` уже отрисован, он будет отрисован повторно.


#### Параметры:
| Parameter | Default value | Description |
|---------|-----------------------|----------|
| data | - | Type: Object.<br>Points descibed using one of following formats:<ul><li>Number[][] - coordinates array;</li><li>[IGeoObject](https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IGeoObject-docpage/) - object implementing `IGeoObject` interface;</li><li>[IGeoObject](https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IGeoObject-docpage/)[] - array of objects implementing `IGeoObject` interface;</li><li>[ICollection](https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ICollection-docpage/) - collection of objects imlementing `IGeoObject` interface;</li><li>[ICollection](https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ICollection-docpage/)[] - array of collection of objects implementing `IGeoObject` interface;</li><li>[GeoQueryResult](https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoQueryResult-docpage/) - result of [geoQuery](https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geoQuery-docpage/) execution;</li><li>Any - JSON representation of data according to [GeoQueryResult](https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoQueryResult-docpage/) input data format.</li> |