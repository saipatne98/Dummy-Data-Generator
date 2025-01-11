const express = require("express");
const app =express();
const mongoose = require("mongoose");
const Employee = require('./model/employee')
const port = 3000;

app.set('view engine','ejs');

mongoose.connect("mongodb://localhost:27017/company")

const getRandom =(arr)=>{
    let rno = Math.floor(Math.random() * (arr.length))
    return arr[rno];
}

app.get('/',(req,res)=>{
    res.render('index');
}) 

app.get('/generate',async (req,res)=>{
   //clear the collection employee
   await Employee.deleteMany({});

    //Generate Random Data
    let randomNames =['Abhijit' , 'Krishnna','harkirat','Rishi']
    let randomLang =['Python','js',"c++","java"];
    let randomCity=['pune','hyderabad','banglore','nanded'];

   for(let index =0;index< 10 ;index++){
    let e = await Employee.create({
        name:getRandom(randomNames),
        salary:Math.floor(Math.random()*50000),
        language:getRandom(randomLang),
        city:getRandom(randomCity),
        isManager:Math.random()>0.5?true:false
    })
    console.log(e);
   }

})


app.listen(port,()=>console.log(`Server Started at PORT:${port}`)); 