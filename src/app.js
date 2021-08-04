const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('postman-request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

app.use(express.static(path.join(__dirname, '../public')))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Zach Light'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Zach Light'
    })
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Zach Light',
        error: 'about not found'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Zach Light'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Zach Light',
        error: 'Help page not found'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'Address must be given!'
        })
    }
    geocode(req.query.address, (error, { lattitude, longitude, location } = {}) => {
        if (error){
            return res.send({error})
        }
        forecast(lattitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error})

            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    } else {
        console.log(req.query.search)
        res.send({
            products: []
        })
    }
   
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Zach Light',
        error: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})