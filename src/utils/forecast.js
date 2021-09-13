const { builtinModules } = require('module')
const request = require('request')

const forecast=(address,callback)=>{

    request({ url:'http://api.weatherstack.com/current?access_key=d9fb1e655242347034fe922fce581538&query=' +address+ '&units=f', json:true }, (error,response)=>{

        if(error){
            callback('Make sure you are connected to the internet',undefined)
        }
        else if(response.body.error){
    
            callback('Unable to find location',undefined)
    
        }

        // else if(response.body.error){
        //     callback('Unable to find location',undefined)
        // }
     
        else{
            console.log(response.body.current)
            callback(undefined,{desc:response.body.current.weather_descriptions[0],temp:response.body.current.temperature,feelslike:response.body.current.feelslike,humidity:response.body.current.humidity})
    
        }
    })

}

module.exports=forecast

// const request = require('request')

// const forecast = (latitude, longitude, callback) => {
//     const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude

//     request({ url, json: true }, (error, { body }) => {
//         if (error) {
//             callback('Unable to connect to weather service!', undefined)
//         } else if (body.error) {
//             callback('Unable to find location', undefined)
//         } else {
//             callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. This high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain.')
//         }
//     })
// }

// module.exports = forecast