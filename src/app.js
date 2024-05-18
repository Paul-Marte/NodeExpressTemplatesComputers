const path = require('path');
const express = require('express');
const hbs = require('hbs');
const product = require('./product');
const app = express();

const PORT = process.env.PORT || 3000;

// Define paths for Express config
const publicDirPath = express.static(path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

//Register partials
hbs.registerPartials(partialPath);

hbs.registerHelper('toLowerCase', str => {
    return str.toLowerCase();
});

// Set up static dir to serve
app.use(publicDirPath);

app.get('', (req, res) => {

    let data = {
        title: 'Home',
        manufacturers: product.getManufactures(),
        inventory: product.getInventory(),
        year: new Date().getFullYear()
    }

    res.render('default', data);
});

app.get('/:manfacturer', (req, res) => {
    let data = {
        title: req.params.manfacturer.charAt(0).toUpperCase() + req.params.manfacturer. slice(1),
        manufacturers: product.getManufactures(),
        inventory: product.getModels(req.params.manfacturer),
        year: new Date().getFullYear()
    }

    res.render('default', data);

});

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}.`)
})








