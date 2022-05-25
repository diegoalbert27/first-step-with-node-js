/**
 * Create a file named time-server.js.  
 * 
 * Write a TCP time server!  
 * 
 * Your server should listen to TCP connections on the port provided by the  
 * first argument to your program. For each connection you must write the  
 * current date & 24 hour time in the format:  
 * 
 *  "YYYY-MM-DD hh:mm"  
 * followed by a newline character. Month, day, hour and minute must be  
 * zero-filled to 2 integers. For example:  
 * 
 *  "2013-07-06 17:42"  
 * 
 * After sending the string, close the connection. 
 */
const net = require('net')

const PORT = process.argv[2];

const server = net.createServer(socket => {
    console.log('client connected')
    const date = new Date()
    
    let year = date.getFullYear()
    let month = ('0' + (date.getMonth() + 1)).slice(-2)
    let day = ('0' + date.getDate()).slice(-2)
    
    let hours = date.getHours()
    let minutes = date.getMinutes()

    let fullDate = `${year}-${month}-${day} ${hours}:${minutes}\n`

    socket.write(fullDate)
    socket.end()
})

server.listen(PORT, () => {
    console.log('server on port ' + PORT)
})
