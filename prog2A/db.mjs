import mongoose from "mongoose"; 
const connetDB = async() => { 
    try{
        await mongoose.connect('mongodb+srv://Venkatesh:7619109684@cluster0.vsjmaj5.mongodb.net/') 
        console.log('conneted to Database.....') 
    }
    catch(error){ 
        console.log(`${error}`)
    }
 }
 export default connetDB