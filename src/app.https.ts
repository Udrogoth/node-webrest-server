import fs from 'fs';
import http2 from 'http2';


const server = http2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert:fs.readFileSync('./keys/server.crt'),
},(req, res) => {
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

   try {
    const resContent = fs.readFileSync(`./public${req.url}`,'utf-8');
    res.end(resContent);
   } catch (error) {
    res.writeHead(404, { 'content-type': 'text/html'})
    res.end();
   }

});


const PORT = 8080;
server.listen(PORT, () => {
    console.log(`server running on port:${PORT}`);
});