const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "CJ Ramki"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "CJ Ramki"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        helpText: "This is some helpful text",
        name: 'CJ Ramki'
    })
})

app.get('/help', (req, res) => {
    res.send([{
        name: 'Andrew'
    }, {
        name: 'Sarah'
    }])
})

app.get('/weather', (req, res) => {
    console.log('hitted')
    if(!req.query.address){
        return res.send({
            error: "You must provide address"
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: 'CJ Ramki',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: 'CJ Ramki',
        errorMessage: 'Page Not Found'     
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})