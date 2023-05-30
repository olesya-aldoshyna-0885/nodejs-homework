const mongoose = require('mongoose');
const app = require('./app');

const DB_HOST = 'mongodb+srv://olesya:first@cluster0.dk3nku5.mongodb.net/db-contacts?retryWrites=true&w=majority';

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
    .then(() => {
        app.listen(3000, () => {
            console.log("Database connection successful")
        })
        
    })
    .catch(error => {
        console.log(error.message)
        process.exit(1);
    })

// olesya
// first