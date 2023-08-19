const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Article=require('./models/article')
const articleRouter = require('./routes/articles');
const methodOverride=require('method-override');
require('dotenv').config()

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster1.0sfxnq9.mongodb.net/blog2`, { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));

app.use('/articles', articleRouter);

app.get('/', async (req, res) => {
    const article= await Article.find().sort({createdAt :'desc'});
    res.render('articles/index.ejs', { articles: article })
});


app.listen(3000, () => {
    console.log("Server Started");
});