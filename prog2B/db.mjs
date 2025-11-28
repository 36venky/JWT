import mongoose from 'mongoose'

const mongo_uri = 'mongodb+srv://Venkatesh:7619109684@cluster0.vsjmaj5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDb = async () => {
    try{
        await mongoose.connect(mongo_uri);
        console.log("Connected to Database...");
    }
    catch(error){
        console.log(`${error}`);
    }
};

export default connectDb;