const Express = require('express');
const { Router } = require('express');
const XLSX = require('xlsx');
const path = require('path');
const Excels = require('../Models/Excels.model');
const multer = require('multer');
var async = require('async');

const app = Express();



var upload = multer({ dest: 'upload/'});


app.get('/', async (req,res)=>{
    res.render('Index');
});

async.eachSeries(app.post('/',upload.single('file'), (req,res) => {
    var sheet = XLSX.readFile(req.file.path);
    var target_path = 'Public/' + req.file.name;
    var sheet_list = sheet.SheetNames;
    var x=0;
    sheet_list.forEach(element => {
        var xlData = XLSX.utils.sheet_to_json(sheet.Sheets[sheet_list[x]]);
        Excels.insertMany(xlData)
        .then(function(){
            console.log(xlData);
            console.log("Data Uploaded");
        })
        .catch(function(error){
            console.log(error);
        })
        x++;
    });
}),(callBack)=>{
        console.log(callBack);
})



module.exports = app;