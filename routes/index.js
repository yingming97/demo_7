var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const {MongoClient, ServerApiVersion} = require('mongodb');
const {Schema} = require("mongoose");
const uri = "mongodb+srv://YingMing:01672545642Aa@cluster0.b8mwo.mongodb.net/CP?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1});
// client.connect(err => {
//     // const collection = client.db("test").collection("devices");
//     // // perform actions on the collection object
//     // client.close();
//     if (err != null) {
//         console.log("Mạng lag")
//     } else {
//         console.log("Connecting....")
//     }
// });
mongoose.connect(uri).catch(err => console.log('Lỗi'));
const CP = mongoose.model('students', new Schema({
    name: String,
    age: Number,
}))
/* GET home page. */
router.get('/', function (req, res, next) {

    CP.find({}, function (error, result) {
        if (error) throw error;
        res.render('index', {data: result});
        console.log(result.length)
    })
});
router.get('/delete/', function (req, res) {
    const id = req.query.id;
    CP.deleteOne({_id: id}, function (error) {
        if (error) throw error;
        res.redirect('/')
    })
})
router.get('/updateForm/', function (req, res) {
    const id = req.query.id;
    CP.findOne({_id: id}, function (error, result) {
        res.render('update', {data: result})
    })
})
router.post('/update', async function (req, res) {
    const id = req.body.id;
    const name = req.body.name;
    const age = req.body.age;


    await CP.updateOne({_id: id}, {
        name: name,
        age: age,
    }, null)

    res.redirect('/')
})
router.post('/create', async function (req, res) {
    const name = req.body.name;
    const age = req.body.age;

    const sv = new CP({
        name: name,
        age: age
    });

    await sv.save();

    res.redirect('/')
})
router.get('/getStudents', function (req, res, next) {
    CP.find({}, function (error, result) {
        if (error) throw error;
        res.send(result);
    })
});

module.exports = router;
