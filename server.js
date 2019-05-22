var express = require('express')
var app = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var path = require('path')

//1. create mongoose connection to db
mongoose.connect('mongodb://localhost/rateMyCakes2')
//2. set schema
var ReviewSchema = new mongoose.Schema({
    rating: Number,
    comment: String,
});
var CakeSchema = new mongoose.Schema({
    baker: String,
    image_url: String,
    reviews: [ReviewSchema],
});
//3. save schema
mongoose.model('Review', ReviewSchema)
mongoose.model('Cake', CakeSchema)
// //4. retrieve schema to use in routes
var Review = mongoose.model('Review')
var Cake = mongoose.model('Cake')

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/dist/public' ));

app.get('/readCake/:id', function(req,res){
    Cake.find({_id:req.param('id')}, function(err,cake){
        if(err){
            console.log('something went wrong');
        } else {
            res.json({cake})
        }
    })
})

app.get('/readAllCakes', function(req,res){
    Cake.find({}, function(err,cakes){
        if(err){
            console.log('something went wrong');
        } else {
            res.json({cakes})
        }
    })
})

app.post('/createCake', function(req,res){
    console.log('inside server', req.body)
    var cake = new Cake(req.body)
    cake.save(function(err){
        if(err){
            console.log('something went wrong', err.errors);
            res.json(err)
        } else {
            console.log('successfully added asdf', cake)
            res.json(cake)
        }
    })
})

app.post('/createReview', function(req,res){
    var review = new Review(req.body)
    review.save(function(err){
        if(err){
            console.log('something went wrong', err.errors);
            res.json(err)
        } else {
            console.log('successfully added review', review)
            res.json(review)
        }
    })
})

app.put('/updateCake', function(req,res){
    Cake.update({_id:req.param('_id')}, req.body, function(err){
        if(err){
            console.log(err)
        } else {
            res.json({message:'succesfully updated cake'})
        }
    })
})

app.delete('/deleteReview', function(req,res){
    Cake.deleteOne({})
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});


app.listen(8000, function(){
    console.log('connected to port 8000')
})
