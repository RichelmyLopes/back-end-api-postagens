const express = require('express');
const app = express();
const Post = require('./models/Post');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/allPosts', function (req, res) {
    Post.findAll().then(function (posts) {
        // Filtrando os dados antes de mandar para View
        const context = {
            postsContext: posts.map(post => {
                return {
                    id: post.id,
                    titulo: post.titulo,
                    conteudo: post.conteudo
                }
            })
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.send({ posts: context.postsContext});
    })
})


app.post('/add', function(req,res){
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(() => {
        res.redirect("http://192.168.0.107:8080");
    }).catch(() => {
        res.send("Houve um erro: " + erro);
    })
})




//INICIANDO SERVIDOR
app.listen(8081, () => {
    console.log("Conectado com sucess");
});