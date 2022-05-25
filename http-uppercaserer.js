/**
 * Create a file named http-uppercaserer.js.  
 * 
 * Write an HTTP server that receives only POST requests and converts  
 * incoming POST body characters to upper-case and returns it to the client.  
 * 
 * Your server should listen on the port provided by the first argument to your program.
 */
const http = require('http')
const map =  require('through2-map')

const PORT = process.argv[2]

const server = http.createServer((req, res) => {
    if (req.method !== 'POST') {
        return res.end('send me a POST\n')
    }

    req.setEncoding('utf8')
    req.pipe(map({ wantStrings: true }, chunk => {
        let convert = chunk.split('').map(chr => chr.toUpperCase()).join('')
        return convert
    })).pipe(res)
})

server.listen(PORT, () => console.log('Server running on port ' + PORT))
