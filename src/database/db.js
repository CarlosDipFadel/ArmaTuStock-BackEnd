import mongoose from 'mongoose';

const conectDB = async () => {
    try {
        console.log(`${process.env.PORTDB}/${process.env.DB}`);
        await mongoose.connect(`${process.env.PORTDB}/${process.env.DB}`, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("DB is connected");
    } catch (error) {
        console.log(error);
    }
};

module.exports = conectDB;