import fs from 'fs';
import http from 'http';


const server = http.createServer((req, res) => {
    console.log(req.url);

    //  res.writeHead(200,{'content-type': 'text/html'})
    //  res.write('<h1>Hola Muldo!!!</h1>');
    //  res.end();

    // const data = {name: 'Jon Doe', age:'20', city: 'New York'}
    //     res.writeHead(200,{'content-type': 'application/json'})
    //     res.end(JSON.stringify(data));

    if (req.url === '/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
        res.writeHead(200, { 'content-type': 'text/html' })
        res.end(htmlFile);
        return;
    }

    if (req.url?.endsWith('.js')) {
        res.writeHead(200, { 'content-type': 'application/javascript' })
    }else if(req.url?.endsWith('.css')){
        res.writeHead(200, { 'content-type': 'text/css'})

    }

    const resContent = fs.readFileSync(`./public${req.url}`,'utf-8');
    res.end(resContent);

});


const PORT = 8080;
server.listen(PORT, () => {
    console.log(`server running on port:${PORT}`);
});