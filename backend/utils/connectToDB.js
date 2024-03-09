import mongoose from "mongoose";

const connectToDB = async () => {
    let isConnected = false;
    mongoose.set('strictQuery', false);
    try {
        if (isConnected) {
            console.log('DB already connected')
            return
        }
        await mongoose.connect(`${process.env.MONGO_URI}`,{
            dbName:'eduproj'
        })
        isConnected = true
        console.log('Connected to DB')
        
    } catch (err) {
        console.log(err)
    }
}

export default connectToDB