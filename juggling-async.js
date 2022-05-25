/**
 * Create a file named http-collect.js.  
 * Write a program that performs an HTTP GET request to a URL provided to you  
 * as the first command-line argument. Collect all data from the server (not  
 * just the first "data" event) and then write two lines to the console  (stdout).  
 * 
 * The first line you write should just be an integer representing the number  
 * of characters received from the server. The second line should contain the  
 * complete String of characters sent by the server.
 */
const http = require('http')
const async = require('async')

let urls = []

for (i = 2; i < process.argv.length; i++) {
   urls = [...urls, process.argv[i]]
}

let results = []

async.forEachOf(urls, (url, i, callback) => {
    http.get(url, (res) => {
        res.setEncoding('utf8')
        
        let rawData = '';

        res.on('data', (data) => rawData += data)
        res.on('end', () => {
            results[i] = rawData
            callback()
        })
    }).on('error', (err) => console.log(err.message))
}, () => {
    console.log(results.join('\n'))
})
