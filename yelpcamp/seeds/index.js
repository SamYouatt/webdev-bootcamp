const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = 'pk.eyJ1Ijoic2FteW91YXR0IiwiYSI6ImNraGc5OHl6ajBiMXYycW85dzMycjRyNmMifQ.-rsK1BquOVZBUiUSij4PLA';
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5fad02dc890f97567236a93e',
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint omnis nobis, ipsam, nemo doloremque facilis, debitis ut odio accusantium reiciendis consequatur tempora culpa amet voluptas quo vero ex necessitatibus quasi?',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/sy2000/image/upload/v1605262094/YelpCamp/ezlcdzv6ywn5dr4sdfvo.jpg',
                    filename: 'YelpCamp/ezlcdzv6ywn5dr4sdfvo'
                },
                {
                    url: 'https://res.cloudinary.com/sy2000/image/upload/v1605262100/YelpCamp/jhdmtwvlzrwdgjqi22w6.jpg',
                    filename: 'YelpCamp/jhdmtwvlzrwdgjqi22w6'
                }
            ]
        })
        await camp.save();
    }
}

seedDB()
    .then(() => {
        db.close();
        console.log('seeded succesfully');
    })
    .catch((err) => {
        db.close();
        console.log('error while seeding');
        console.log(err);
    })