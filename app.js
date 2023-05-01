const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function (req, res) {

  res.sendFile(__dirname + "/index.html")


  //res.send("Server is up and running.")
})

app.post("/", function(req,res) {
  //console.log(req.body.cityName)
  const query = req.body.cityName
  const apiKey = "cf6f23b2acd18dd5774a8afdae1c662d"
  const unit = "metric"

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+unit

    https.get(url, function(response) {
      console.log(response.statusCode)

      response.on("data", function(data) {
        //console.log(data)
        const weatherData = JSON.parse(data)
        console.log(weatherData)
    // const object = {
    //   name: "Shreyash",
    //   favouriteFood: "Pav Baji"
    // }
    // console.log(JSON.stringify(object))

    const temp = weatherData.main.temp
    console.log(temp)

    const weatherDescription = weatherData.weather[0].description
    console.log(weatherDescription)

    const icon = weatherData.weather[0].icon
    const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png"

    res.write("<p>The weather is currently "+weatherDescription+"</p>")
    res.write("<h1>Temperature at the "+ query +" is "+temp+" degrees Celcius.</h1>")
    res.write("<img src= "+imageURL+">")

    res.send()

      })

   })

})



app.listen(3000, function () {
  console.log("Server is running on port 3000.")
})
