const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+'/date.js')
const app = express();

const items = ['Buy Food','Cook Food', 'Eat Food'];
const workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


app.get('/', (req, res) => {

    const day = date.getDate();

    res.render('list',{listTitle:day, newListItem:items});
});

app.post('/', (req, res) => {
    const item = req.body.newItem;
    
        if(!req.body.newItem){
            res.send('please go back and enter a new item');
        } else if (req.body.list==="Work"){
                workItems.push(item);
                res.redirect('/work');
        } else {
            items.push(item);
            res.redirect('/');
        }        

});

app.get('/work', (req, res) => {
    res.render('list', {listTitle:"Work List", newListItem:workItems})
});

app.post('/work', (req, res) => {
    const item = req.body.newItem;
    workItems.push(item);

    res.redirect('/');
});


app.listen(3000, () => {
    console.log('App listening on port 3000!');
});