# Eyesbot

Visit the web site through the eyes of the robot

## Installation

```npm install```

## How to use.

Type ```node bot -h``` for help

All keys below the required

* ```-b``` - bot variant for user agent string, values:
  * Googlebot: -b google
  * Googlebot for smartphone: -b googleMobile
  * Bingbot: -b bing
  * YandexBot: -b yandex
  * YandexBlogs: -b yandexBlogs
  * Facebook: -b facebook

* ```-u``` - url for request.
  Example: -u http://ya.ru/

* ```-d``` - directory for report.
  Example: -d yaru

Full string for http request:

```node bot -b google -u http://ya.ru/ -d yaru```

Find your server answers in report directory!
