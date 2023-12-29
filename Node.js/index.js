// console.log('Hello From Node.js...')
// const Person = require('./person');
// const person1 = new Person('John', 30)
// person1.greeting();

const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    const extname = path.extname(filePath);

    let contentType = 'text/html';
    switch(extname){
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    // Read file
    fs.readFile(filePath, (err, content) => {
        if(err){
            if(err.code == 'ENOENT') {
                // Page not find
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type': contentType});
                    res.end(content, 'utf8')
                })
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf8')
        }
    })
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));