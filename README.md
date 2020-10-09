## Intro

Chirper (Tweeter) is a one-page application which mimics Twitter. Users may submit short messages of up to 140 characters.

## Stack

* Back-end: Node, Express
* Front-end: jQuery, Sass

## Screenshots

![Mobile Homepage](https://github.com/sherwin-kwan/tweeter/blob/master/server/img/mobile.png)
![Desktop Homepage](https://github.com/sherwin-kwan/tweeter/blob/master/server/img/img1.png)
![Errors](https://github.com/sherwin-kwan/tweeter/blob/master/server/img/toolong.png)
![Reading Chirps](https://github.com/sherwin-kwan/tweeter/blob/master/server/img/chirps.png)

## Running The App

* ```npm install``` to install dependencies. If there are any issues with *package.json*, install the following dependencies manually:
  * body-parser
  * chance
  * express
  * md5
  * nodemon (dev dependency)
  * sass (dev dependency)
* Start the server with ```npm run local```. By default the app runs on port 8080; if you need to change this (e.g. if there is a VM conflict),
change the constant *PORT* in */server/index.js*.
* All the CSS files in this project are compiled from Sass (.scss) files. Once you have installed Sass with ```npm install sass```, you will be able to edit the .scss files, then run ```sass public/styles``` to automatically compile these into CSS. See [here](https://sass-lang.com/guide) for more information.

## Routes

* This is a one page webapp. Once you have a server running, visit localhost:8080/ with browser to see the one page.
* For debugging purposes, you may access the in-memory database in JSON format at localhost:8080/tweets
  * You may wish to install a JSON reading add-on (e.g. JSON Viewer for Chrome), or use a browser with a built-in JSON reader (e.g. Firefox)
* This is a responsive webapp. If you wish to view the mobile version, change the width of your viewport to 1023 pixels wide (or less).

## Known Issues ##

* The "go back to top" button at the bottom right of the screen has not yet been implemented. As a workaround, clicking on "Chirper" at the top left will return you to the top of the screen, on both mobile and desktop.
* The character count (140) is four years behind the times, and needs to be doubled for parity with Twitter.

## Copyright/Originality

The back-end code was supplied by Lighthouse Labs staff; front-end code (everything in /public) is (C) 2020 Sherwin Kwan.

Warning: the original codebase did not have a license file, so although this has been posted on Github, it's not legally FOSS. If you're
planning on forking this or using it in your own code, you should verify with Lighthouse Labs first.
