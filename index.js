// npm nodemailer -send data to the mail

let express = require('express');
let bodyParser = require('body-parser');

let app = express();

let urlencodedParser = bodyParser.urlencoded({extended: false});

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

app.get('/', function (req, res) {
    res.render('main');
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.post('/about', urlencodedParser,function (req, res) {
    if(!req.body) return res.sendStatus(400);
    console.log(req.body);
    res.render('about-success', {data:req.body});
});

app.get('/news/:id', function (req, res) {
    let obj = {title: "Новость", id: 4, paragraphs: ['Параграф-1', 'Параграф-2', 'Параграф-3', 'Параграф-4']};
    console.log(req.query);
    res.render('news', {newsId: req.params.id, obj: obj});
});

app.listen(3000);
