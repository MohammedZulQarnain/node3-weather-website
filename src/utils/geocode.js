const request = require('request')

const geocode = (address, callback) => {
    const url ='https://geocoding-api.open-meteo.com/v1/search?name='+address+'&count=1&language=en&format=json'
    request({url, json: true},(error, {body})=>{
        if (error){
            callback('Unable to connect to location service', undefined)
        }
        else if (body.results == undefined){
            callback('Unable to find location, try again with different search term', undefined)
        }else{
            callback(undefined, {
                latitude: body.results[0].latitude,
                longitude: body.results[0].longitude,
                location: body.results[0].admin2+", "+body.results[0].admin1+", "+body.results[0].country
            })
        }

    })
}

module.exports = geocode