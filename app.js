const express = require("express");
const https = require('https');

const app = express();




app.get("/", function(req, res){
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=dubai&appid=a732389836363d79d1649abdaca4fdbb&units=imperial#';
    
    //https get request over the internet to the url
    https.get(url , function(response){
        //logging the response from the api get request
        // console.log(response)
        // console.log("statusCode: ", response.statusCode)

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            //logs data in hexadecimal format
            const location = weatherData.name
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            console.log(weatherData)
            //res = refers to the app.get's callback function response param
            
            res.write("<h1>The temperature in " + location + " is " + temp + " degrees Fahrenheit.</h1>")
            res.write("<p>The weather is currently " + weatherDescription + ".</p>")
            res.send()
        })
    });

})

app.listen(3000, function(){
    console.log("server is running on port 3000")
})

