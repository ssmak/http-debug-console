#! /usr/bin/env node

'use strict';

/**
function definition
*/
var debug = new Object();
debug.log = function (data) {
	console.log(data);
}

//require package
const EXPRESS = require('express');
const PATH = require('path');
const FS = require('fs');
const OPEN = require('open');
const APP_INFO = require('./package.json');

//constants
const DEBUG = false;
const APP_NAME = APP_INFO.name;
const APP_DESC = APP_INFO.description;
const APP_VER = APP_INFO.version; //majar.minor.patch (odd minor version mean unstable)
const AUTHOR = APP_INFO.author;
const REPOSITORY = APP_INFO.repository.url;

/**
main, entry point
*/
console.log('>>>>>>');
console.log('App: %s (v%s)', APP_NAME, APP_VER);
console.log("Desc: %s", APP_DESC);
console.log("Source: %s", REPOSITORY);
console.log("Author: %s\n", AUTHOR);

if(!DEBUG) {
	debug.log = function () {}
}

//variables
var port = 8080;
var app, web_server;
var cache = {};

if(/^\d{1,5}$/.test(process.argv[2])) {
	//specified port number
	port = process.argv[2];
}

//web requests handler
app = EXPRESS();

app.use(EXPRESS.static('.'));

//console to view server debug message (html)
app.get('/', function (req, res) {
    res.writeHead(200, {'content-type': 'text/html'});
    FS.readFile(__dirname + '/console.html', function (err, data) {
        res.end(data);
    });
});

//handle push message
app.get('/push', function (req, res) {
    debug.log('received query: ' + req.query);
    if(req.query.s != null && req.query.o != null) {
        if(cache[req.query.s] == null) {
            //new signature
            cache[req.query.s] = req.query.o;
        } else {
            //old, signature already existed
            cache[req.query.s] = req.query.o + '\n' + cache[req.query.s];
        }
        debug.log('cached: ' + cache[req.query.s]);
        res.send('ok');
    } else {
        //params missing
        res.send('fail');
    }
    
    res.end();
});

//handle pull message
app.get('/pull', function (req, res) {
    debug.log('received query: ' + req.query);
    if(req.query.s != null) {
        if(cache[req.query.s] != null) {
            //ignature existed
            debug.log('cached: ' + cache[req.query.s]);
            res.send(cache[req.query.s]);
            //flush the cache
            cache[req.query.s] = '';
        }
    }
    
    res.end();
});


//express server startup			
web_server = app.listen(port, function () {
    console.log('<< listen on port %s', port);
    console.log('<< debug message should be sent to http://{ IP_ADDRESS }:%s?s={ IDENTIFIER }&o={ DEBUG_MESSAGE }', port);	
    console.log('<< Ctrl + C to interrupt the process (In Windows)');
    OPEN('http://localhost:' +  port);	
});			