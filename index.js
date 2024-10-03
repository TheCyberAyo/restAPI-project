const http = require('http'); //helps to communicate with other computers
const fs = require('fs'); //makes changes in the server
const path = require('path'); //allows us manauvere arond the files in the project

const PORT = 3000; //
const dataFilePath = path.join(__dirname, 'anything.json'); //a file named "anything.json" is kept has different files

const server = http.createServer((req, res) => { //receiving request and making responses
    res.setHeader('Content-Type', 'application/json'); //making all letters to be json

    // Log incoming requests
    console.log(`${req.method} ${req.url}`); //type of method and where it’s coming from (url)

    if (req.method === 'GET' && req.url === '/items') {
        // GET /items
        fs.readFile(dataFilePath, 'utf8', (err, data) => { // open file) and look inside
            if (err) {
                res.writeHead(500);
                return res.end(JSON.stringify({ error: 'Failed to read data' })); //an error message that lets one know taht there is something wrong
            }
            res.writeHead(200);
            res.end(data); //message written to us to say the list is found, as well as show the list
        });
    } else if (req.method === 'POST' && req.url === '/items') { //
        // POST /items
        let body = ''; //accummulates data
        req.on('data', chunk => { //sets up an event listener for the request
            body += chunk.toString(); //converts incoming chunk string and appends it to the body variable.
        });
        req.on('end', () => {
            try {
                const newItem = JSON.parse(body); //turning it from a string into something JSON, which we can use.
                fs.readFile(dataFilePath, 'utf8', (err, data) => {
                    if (err) {
                        res.writeHead(500);
                        return res.end(JSON.stringify({ error: 'Failed to read data' }));
                    }
                    const items = JSON.parse(data);
                    items.push(newItem);
                    fs.writeFile(dataFilePath, JSON.stringify(items), err => {
                        if (err) {
                            res.writeHead(500);
                            return res.end(JSON.stringify({ error: 'Failed to save data' }));
                        }
                        res.writeHead(201);
                        res.end(JSON.stringify(newItem));
                    });
                });
            } catch (parseError) {
                res.writeHead(400);
                return res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    } else if (req.method === 'PUT' && req.url.startsWith('/items/')) {
        // PUT /items/:id
        const id = req.url.split('/')[2];
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const updatedItem = JSON.parse(body);
                fs.readFile(dataFilePath, 'utf8', (err, data) => {
                    if (err) {
                        res.writeHead(500);
                        return res.end(JSON.stringify({ error: 'Failed to read data' }));
                    }
                    let items = JSON.parse(data);
                    const index = items.findIndex(item => item.id == id);
                    if (index !== -1) {
                        items[index] = updatedItem;
                        fs.writeFile(dataFilePath, JSON.stringify(items), err => {
                            if (err) {
                                res.writeHead(500);
                                return res.end(JSON.stringify({ error: 'Failed to save data' }));
                            }
                            res.writeHead(200);
                            res.end(JSON.stringify(updatedItem));
                        });
                    } else {
                        res.writeHead(404);
                        res.end(JSON.stringify({ error: 'Item not found' }));
                    }
                });
            } catch (parseError) {
                res.writeHead(400);
                return res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    } else if (req.method === 'DELETE' && req.url.startsWith('/items/')) {
        // DELETE /items/:id
        const id = req.url.split('/')[2];
        fs.readFile(dataFilePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end(JSON.stringify({ error: 'Failed to read data' }));
            }
            let items = JSON.parse(data);
            items = items.filter(item => item.id != id);
            fs.writeFile(dataFilePath, JSON.stringify(items), err => {
                if (err) {
                    res.writeHead(500);
                    return res.end(JSON.stringify({ error: 'Failed to save data' }));
                }
                res.writeHead(204);
                res.end();
            });
        });
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
