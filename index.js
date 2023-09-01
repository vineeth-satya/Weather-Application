const axios = require("axios");
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;
const ejs = require("ejs");
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render("weather.ejs", { condition: undefined ,Humidity:"",Speed:""});
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/", async (req, res) => { // Mark the function as async here
  const userInput = req.body.loc; // Fixed the syntax here
  console.log(userInput)
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=241a03cff9eab60d091fdc3b6aef49e8&units=metric`
    );
    const data = response.data;
    const weather = data.weather[0].description;
    const temperature = data.main.temp;
    const city = data.name;
    const humidity=data.main.humidity;
    const speed=data.wind.speed;

    const message = `${temperature.toFixed(2)}°C ${weather}`;
    const hum=`${humidity} g`;
    const sp=`${speed} Km/h`;

    console.log(message);
    res.render("weather.ejs", { condition: message,Humidity:hum,Speed:sp
     }); 

    // Render the message in your view
  } catch (error) {
    console.log("City doesn't exist.");
    res.render("weather.ejs", { condition: "City doesn't exist." }); // Render an error message in your view
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});