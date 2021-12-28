const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e105dda891bf29233a5a8906a24968ea&query=' + latitude + ',' + longitude
    console.log(url)
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            console.log(body.error)
            callback('Unable to find location', undefined)
        } else {
            console.log(body)
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degress out.')
        }
    })
}

module.exports = forecast