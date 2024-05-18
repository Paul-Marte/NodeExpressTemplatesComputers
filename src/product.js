const fs = require('fs');

const getInventory = () => {
    try {
        const dataBuffer = fs.readFileSync('computers.json');

        return JSON.parse(dataBuffer.toString());
    } catch (err) {
        console.log(err);
        return [];
    }
}


const getModels = (manufacturer) => {
    const inventory = getInventory();
    const queryManufacturer = inventory.filter(i => i.manufacturer.toLowerCase() === manufacturer.toLowerCase());

    return queryManufacturer;
}

const getManufactures = () => {
    const inventory = getInventory();
    let manufacturers = [];

    inventory.forEach(m => {
        manufacturers.push(m.manufacturer);
    });

    return manufacturers;
}

module.exports = {
    getInventory,
    getModels,
    getManufactures
}