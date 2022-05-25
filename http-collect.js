/**
 * Create a file named http-collect.js.  
 * Write a program that performs an HTTP GET request to a URL provided to you  
 * as the first command-line argument. Collect all data from the server (not  
 * just the first "data" event) and then write two lines to the console (stdout).  
 * The first line you write should just be an integer representing the number  
 * of characters received from the server. The second line should contain the  
 * complete String of characters sent by the server.
 */
const http = require('http')
const { BufferListStream } = require('bl') // Version alternativa BufferList

// const bl = new BufferList()

url = process.argv[2]

http.get(url, (res) => {
    res.setEncoding('utf8')
    
    // let rawData = ''
    
    // res.on('data', data => rawData += data)

    // res.on('end', () => {
    //     try {
    //         bl.append(rawData)
    //         console.log(bl.length)
    //         console.log(rawData)
    //     } catch (e) {
    //         console.log(e.message)
    //     }
    // })

    res.pipe(BufferListStream((err, data) => {
        console.log(data.length)
        console.log(data.toString())
    }))
    
}).on('error', err => console.log(`Got error: ${err.message}`))
