const request = require('request')
const weatherDescription = require('./utils')

const forecast = (lat, long, callback) => {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + long + '&current=temperature,precipitation,apparent_temperature,weather_code'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to connect to waether service", undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
            //pass lat and long as 'nil', 'nil' from app.js
        }
        else {
            const weather_description = weatherDescription(body.current.weather_code)
            callback(undefined, weather_description + ". It is " + body.current.temperature + "" + body.current_units.temperature + " out. Feels like " + body.current.apparent_temperature + body.current_units.temperature + " out."+" There is " + body.current.precipitation + "% chance of rain")
        }
    })

}

module.exports = forecast