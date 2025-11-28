import express from 'express';
import cors from "cors";
import {body,validationResult} from "express-validator";
import connectDB from './db.mjs';
import Student from './studentModel.mjs';

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.post('/students',
    [
        body("name").trim().isLength({min:2}).escape(),
        body("email").isEmail().normalizeEmail(),
        body("age").isInt({min:5,max:100}).toInt(),
        body("course").isIn(["Math","Science","History","Art","Physical Education","Computer Science","Literature","Biology","Chemistry","Physics","Economics","Music"]).escape()
    ],
    async (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        try{
            const student = new Student(req.body);
            await student.save();
            res.status(201).json({message:"Student record created",data:student});
        }
        catch(error){
            res.status(500).json({message:error.message});
        }
    }
);

app.get("/students",async(req,res) => {
    try{
        const student = await Student.find();
        if(!student){
            return res.status(404).json({message:"Student not found"});
        }
        res.status(200).json({student});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
});

app.put("/students/:id",
    [
        body("name").optional().trim().isLength({min:2}).escape(),
        body("email").optional().isEmail().normalizeEmail(),
        body("age").optional().isInt({min:5,max:100}).toInt(),
        body("course").optional().isIn(["Math","Science","History","Art","Physical Education","Computer Science","Literature","Biology","Chemistry","Physics","Economics","Music"]).escape()
    ],
    async(req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        try{
            const student = await Student.findByIdAndUpdate(req.params.id,req.body,{new:true});
            if(!student){
                return res.status(404).json({message:"Student not found"});
            }
            res.status(200).json({message:"Student record updated",data:student});
        }
        catch(error){
            res.status(500).json({message:error.message});
        }
    }
);

app.delete("/students/:id",async(req,res) => {
    try{
        const student = await Student.findByIdAndDelete(req.params.id);
        if(!student){
            return res.status(404).json({message:"Student not found"});
        }
        res.status(200).json({message:"Student record deleted",data:student});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }   
});

// // ...existing code...

// // Catch-all for unknown routes
// app.use((req, res) => {
//     res.status(404).json({ message: "Resource not found" });
// });

// // ...existing code...

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log(`Server is running on port http://localhost:${PORT}/students`);
});