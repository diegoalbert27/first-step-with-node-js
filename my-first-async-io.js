/**
 * Create a file named my-first-async-io.js.  
 * Write a program that uses a single asynchronous filesystem operation to  
 * read a file and print the number of newlines it contains to the console 
 * (stdout), similar to running cat file | wc -l.  
 * The full path to the file to read will be provided as the first  
 * command-line argument.
 */
const fs = require('fs')
 
let lines

function handleFile(err, file) {
    if (err) console.log(err) 
    
    lines = file.split('\n').length - 1
    console.log(lines)
}

fs.readFile(process.argv[2], 'utf-8', handleFile)
