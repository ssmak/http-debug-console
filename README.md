# http-debug-console
## Methodology
Let a web server sits between client browser and remote server(debug target). So the output/debug message of the server side script can post to the web server and then view in the client browser in real time. (Or you may see that's a server side debugger)

## Quick Start
(1) Run the script (#Assume the server runs on 192.168.1.1 with port 8080).
```
node app.js --host 192.168.1.1 --port 8080
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
ssmak
