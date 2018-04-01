var express = require('express');
var app = express();
var courses = require('./data/courses.json');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

app.get('/', function (req, res) {
    res.render('index', {title: "API"});
});
app.get('/contact', function (req, res) {
    res.render('contacts');
});
app.get('/about', function (req, res) {
    res.render('about');
});
app.get('/api/courses', function (req, res) {
    res.render('courses', {
        title: "courses",
        courses: courses

    });
});


//Обработчик контактной формы
app.post('/send', function (req, res) {
    var transporter = nodemailer.createTransport({
        host: 'mail.ukraine.com.ua',
        port: 2525,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "mail@notesbook.org",
            pass: "*******"
        }
    });

    var mailOptions = {
        from: 'mail@notesbook.org',
        to: 'evgenij.kolesnik02@gmail.com',
        subject: 'Новое сообщение от' + req.body.name,
        text: 'Текст сообщения: ' + req.body.message + '. Ожидает ответ на E-mail:' + req.body.email
    };

    var message = transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
    });


    res.redirect('/contact');
});


app.get('/courses/add', function (req, res) {
    res.render('add');
});
app.get('/courses/delete', function (req, res) {
    res.render('add');
});
app.get('/courses/edit', function (req, res) {
    res.render('add');
});
app.listen(3000, function () {
    console.log('Go to localhost 3000');
});