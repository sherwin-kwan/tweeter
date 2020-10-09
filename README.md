## Intro

Chirper (Tweeter) is a one-page application which mimics Twitter (with the pre-2017 character count). Users may submit short messages of up to 140 characters.

## Stack

Back-end: Node, Express
Front-end: jQuery

## Running The App

* ```npm install``` to install dependencies. If there are any issues with *package.json*, install the following dependencies manually:
  * body-parser
  * chance
  * express
  * md5
  * nodemon
* Start the server with ```npm run local```. By default the app runs on port 8080; if you need to change this (e.g. if there is a VM conflict),
change the constant *PORT* in */server/index.js*.

## Routes

* This is a one page webapp, so localhost:8080/ is the only HTML page.
* For debugging purposes, you may access the in-memory database in JSON format at localhost:8080/tweets
  * You may wish to install a JSON reading add-on (e.g. JSON Viewer for Chrome), or use a browser with a built-in JSON reader (e.g. Firefox)

## Copyright/Originality

The back-end code was supplied by Lighthouse Labs staff; front-end code (everything in /public) is (C) 2020 Sherwin Kwan.

Warning: the original codebase did not have a license file, so although this has been posted on Github, it's not legally FOSS. If you're
planning on forking this or using it in your own code, you should verify with Lighthouse Labs first.