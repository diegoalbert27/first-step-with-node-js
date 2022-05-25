/**
 * Create a file named http-json-api-server.js.  
 * 
 * Write an HTTP server that serves JSON data when it receives a GET request  
 * to the path '/api/parsetime'. Expect the request to contain a query string  
 * with a key 'iso' and an ISO-format time as the value.  
 * 
 * For example:  
 * 
 * /api/parsetime?iso=2013-08-10T12:10:15.474Z  
 * 
 * The JSON response should contain only 'hour', 'minute' and 'second'  
 * properties. For example:  
 *  
 *  {  
 *    "hour": 14,  
 *    "minute": 23,  
 *    "second": 15  
 *  }  
 * 
 * Add second endpoint for the path '/api/unixtime' which accepts the same  
 * query string but returns UNIX epoch time in milliseconds (the number of  
 * milliseconds since 1 Jan 1970 00:00:00 UTC) under the property 'unixtime'.  
 * For example:  
 * 
 *   { "unixtime": 1376136615474 }  
 * 
 * Your server should listen on the port provided by the first argument to  
 * your program.
 */
const http = require('http')
const { URL } = require('url')

const PORT = process.argv[2]

const server = http.createServer((req, res) => {
    let realUrl = 'http' + '://' + req.headers.host + req.url;
    const reqUrl = new URL(realUrl)
    
    if (reqUrl.pathname == "/api/parsetime") {
        let query = reqUrl.searchParams.get('iso') ?? false

        if (query) {
            let date = new Date(query)
            
            let response = {
                hour: date.getHours(),
                minute: date.getUTCMinutes(),
                second: date.getUTCSeconds()
            }

            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.write(JSON.stringify(response))
            res.end()
        }

        res.end()
    }

    if (reqUrl.pathname == '/api/unixtime') {
        let query = reqUrl.searchParams.get('iso') ?? false
        
        if (query) {
            let date = new Date(query)
            let response = {
                unixtime: parseInt(String(date.getTime() / 1000).replace('.', ''))
            }

            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.write(JSON.stringify(response))
            res.end()
        }

        res.end()
    }

    if (reqUrl.pathname == "/") {
        res.write('Principal Home Page')
        res.end()
    }
})

server.listen(PORT)
console.log('Server on port ' + PORT)
