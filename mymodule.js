const fs = require('fs')

module.exports = function (dirname, ext, callback) {
    fs.readdir(dirname, function (err, lines) {
        if (err) {
            return callback(err)
        }

        let result = []

        lines.forEach(file => {
            file.split('.')[1] === ext ? result.push(file) : null
        })

        return callback(null, result)
    })
}

