const mongoose=require('mongoose');
const cities=require('./cities');
const {places, descriptors}=require('./seedHelpers');
const Campground=require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(()=>{
        console.log("Database Connected");
    })
    .catch(err=>{
        console.log(err);
    })

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

const sample=array=>array[Math.floor(Math.random()*array.length)];

const seedDB= async()=>{
    await Campground.deleteMany({});
    for(let i=0; i<50; i++){
        const random1000= Math.floor(Math.random()*1000);
        const price=Math.floor(Math.random()*20)+10;
        const camp= new Campground({
            author: '63ca6889e775fd273dafbbfa',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate quaerat illum, at eveniet quod veniam similique aliquid iure assumenda amet possimus minus obcaecati architecto dolore rerum et! At, earum perferendis!',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dhvyo7t6i/image/upload/v1674417541/YelpCamp/cnnnvwjblnik1o4v72rd.jpg',
                    filename: 'YelpCamp/cnnnvwjblnik1o4v72rd',
                  },
                {
                    url: 'https://res.cloudinary.com/dhvyo7t6i/image/upload/v1674417542/YelpCamp/ixwxtziqcknsn1mbej0w.jpg',
                    filename: 'YelpCamp/ixwxtziqcknsn1mbej0w',
                }  
            ]
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
});