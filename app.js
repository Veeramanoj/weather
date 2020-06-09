const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app =express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");

})
app.post("/",function(req,res){

  const loc=req.body.cityname;
  const url='https://api.openweathermap.org/data/2.5/find?appid=e72ca729af228beabd5d20e3b7749713&q='+loc+'&units=metric';
  https.get(url ,function(response){
    response.on("data",function(d){
      const dat = JSON.parse(d);
      const icon= dat.list[0].weather[0].icon;
      const img="https://openweathermap.org/img/wn/" +icon+"@2x.png";
      res.write("<h1>Temperatue in "+loc +" is " + dat.list[0].main.temp +" deg celsius <h1>");
      res.write("<img src="+ img  +">" );
      res.send();
    });
  })


})
app.listen(3000,function(){
  console.log("started server ");
})
