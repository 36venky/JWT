import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name :{
        type:String,
        requried:[true,"Student name is requried"],
        trim:true,
        minlength:[2,"Name must be at least 2 characters"],
    },
    email:{
        type:String,
        requried:[true,"Email is requried"],
        unique:true,
        lowercase:true,
        match:[/^\S+@\S+\.\S+$/,"Please use a valid email address"]
    },
    age:{
        type:Number,
        requried :[true,"Age is requried"],
        min:[5,"Age must be at least 5"],
        max:[100,"Age must be at most 100"]
    },
    course:{
        type:String,
        requried:[true,"Course is requried"],
        enum:["Math","Science","History","Art","Physical Education","Computer Science","Literature","Biology","Chemistry","Physics","Economics","Music"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Student = mongoose.model('Student',studentSchema);

export default Student;