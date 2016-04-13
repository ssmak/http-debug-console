# http-debug-console
Echo the debug message to http server and view from your browser in real time.
```
node app.js 8080 //listen on port 8080
```
## Quick Start
(1) Run the program (#Assume the server runs on 192.168.1.1 with port 8080).
```
node app.js 8080
```
(2) Open your favourite browser and visit here http://192.168.1.1:8080 .

(3) Post debug message to that link which shows on the web page.
```
curl http://192.168.1.1:8080/push?s=d5fe7231-012c-11e6-b051-8db09cca93c8&o=testing
```
(4) Now you can view the debug message from your browser in real time.
## License
MIT
## Author
Steve Mak (ssmak)
