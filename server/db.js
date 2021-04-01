const mongoose = require('mongoose')

const connectToMongo = async () => {
    try {
        await mongoose.connect('mongodb+srv://blah:jXL7EnKD9dQ77Uc8@shoppingonline.kvzbm.mongodb.net/shopping?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("Connected successfully!");
    } catch (error) {
        console.error(error);
    }
};

module.exports = { connectToMongo };
