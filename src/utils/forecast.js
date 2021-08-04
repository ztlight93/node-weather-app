const request =  require('postman-request')

const forecast = (lattitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ac9299b32d50f8f19cf70eae5cd030a7&query=' + lattitude + ',' + longitude + '&units=f'

    request({ url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] 
                + ': The current temperature is ' + body.current.temperature 
                + ' degrees and it feels like ' + body.current.feelslike 
                + ' degrees. There is a ' + body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast