let http = require('http');
let url = require('url');
let fs = require('fs');
let path = require('path');

let ROOT = __dirname + "../public";

http.createServer(function (req, res) {
   if(!checkAccess(req)){
       res.statusCode = 403;
       res.end('Yep, sorry, bro');
       return;
   }

   sendFileSafe(url.parse(req.url).pathname, res);
}).listen(3000);

function checkAccess(req){
    return url.parse(req.url, true).query.secret === 'o_O';
}

function sendFileSafe(filePath, res){
    try{
        filePath = decodeURIComponent(filePath);
    }catch(e){
        res.statusCode = 400;
        res.end('Bad request');
        return;
    }

    if(~filePath.indexOf('\0')){
        res.statusCode = 400;
        res.end('Bad request');
        return;
    }

    filePath = path.normalize(path.join(ROOT, filePath));

    if(filePath.indexOf(ROOT)!==0){
        res.statusCode=404;
        res.end('File not found');
        return;
    }

    fs.stat(filePath, function(err, stats){
        if(err|| !stats.isFile()){
            res.statusCode=404;
            res.end('File not found');
            return;
        }

        sendFile(filePath, res);
    });
}