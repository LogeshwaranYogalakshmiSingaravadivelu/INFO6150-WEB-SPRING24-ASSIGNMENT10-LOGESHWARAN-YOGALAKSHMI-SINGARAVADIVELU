const express = require('express')
const router = express.Router()
const Data = require('../models/data_types')
const Data1 = require('../models/data_types1')
const Image = require('../models/imageUpload')
const Employee = require('../models/employee')
// const Image = require('../../../Assignment-9/React Frontend/public/upload/user')
const _multer = require('multer')
const _path = require('path')
const bcrypt = require('bcrypt')
const multer = require('multer')
const path = require('path')
const session = require('express-session');
const cookieParser = require('cookie-parser');

router.use(cookieParser())
router.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure:false,
        maxAge: 1000*60*60*24
    }
}))

const _destination = "../../Assignment-9/React Frontend/public/upload/user"


router.get('/getAll', async(req,res)=>{
    try{
        const value = await Data.find({}, { _id: 0, password: 0, __v:0 }).select('fullname email type');
        res.json(value)
    }catch{
        res.status(500)
        res.json({
            status: 500,
            message: "Internal Server Error"
        })
    }
})

router.get('/getAll1', async(req,res)=>{
    try{
        const value = await Data1.find()
        res.json(value)
    }catch{
        res.status(500)
        res.json({
            status: 500,
            message: "Internal Server Error"
        })
    }
})

router.get('/get/jobs', async(req,res)=>{
    try{
        const value = await Employee.find()
        res.json(value)
    }catch{
        res.status(500)
        res.json({
            status: 500,
            message: "Internal Server Error"
        })
    }
})

router.post("/products", async (req,res)=>{
    try {
        //console.log(req.body);
        const email= req.body.email;
        const pass = req.body.pass;
        //console.log(pass);
        //console.log(email);
        const user = await Data.findOne({ email: email });
        //console.log(user.type);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(pass, user.password);
        //console.log(isMatch);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        req.session.email = email;
        //console.log(req.session.email);
        //console.log(req.body.type);
        //console.log(user.type);
        res.json({ message: true, sessionData: user.type, type: user.type });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.post('/create', async(req,res)=>{
    const emailRegex = /^[a-zA-Z0-9._%]+@northeastern\.edu$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    const typeCheck = req.body.type;

    if(!(typeCheck === "employee" || typeCheck === "admin")){
        return res.status(400).json({error: "Invalid Type Format"});
    }

    if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({error: "Invalid Email Format"});
    }
    if (!passwordRegex.test(req.body.password)) {
        return res.status(400).json({error: "Weak Password"});
    }
    const salt = 10
    const hash = await bcrypt.hash(req.body.password, salt);
    const value = new Data({
        fullname: req.body.fullname,
        email: req.body.email,
        password: hash,
        type: req.body.type
    })
    try{
        await value.save()
        res.json({
            status: 200,
            message: "User Created Successfully"
        })
    }catch(err){
        if (err.code === 11000) {
            return res.status(409).json({status: 409,error: "User already exists."});
        }
        res.status(500).json({status: 500,error: "Internal Server Error"});
    }
})

router.post('/create/job', async(req,res)=>{
    try {
        //console.log(req.body);
        // const salary= req.body.sal;
        // const jobTitle = req.body.job;
        // console.log(salary);
        // console.log(jobTitle);
        // console.log(req.body.descript);
        //console.log(req.body.company);
        const value = new Employee({
            name: req.body.company,
            title: req.body.job,
            description: req.body.descript,
            salary: req.body.sal
        })
        try{
            await value.save()
            res.json({ message: true});
        }catch(err){
            res.status(500).json({status: 500,error: "Internal Server Error"});
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.post('/create1', async(req,res)=>{
    const value = new Data1({
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        lastUpdated: req.body.lastUpdated,
        applyLink: req.body.applyLink
    })
    try{
        await value.save()
        res.json({
            status: 200,
            message: "User Created Successfully"
        })
    }catch(err){
        if (err.code === 11000) {
            return res.status(409).json({status: 409,error: "User already exists."});
        }
        res.status(500).json({status: 500,error: "Internal Server Error"});
    }
})

router.delete('/delete', async(req,res)=>{
    try{
        var n1 = req.body.email;
        const del = await Data.findOneAndDelete({"email": n1})
        if (!del) {
            return res.status(404).json({
                status: 404,
                message: "User Not Found"
            });
        }
        res.json({
            status: 200,
            message: "User Deleted Successfully"
        })
    }catch(err){
        res.status(500)
        res.json({
            status: 500,
            message: "Internal Server Error"
        })
    }
})

router.put('/edit', async(req,res)=>{
    try{
        const n1 = req.body.email
        const val = await Data.findOneAndUpdate({"email": n1}, req.body);  
        val.fullname = req.body.fullname
        val.password = req.body.password
        const a1 = await val.save()
        res.json({
            status: 200,
            message: "User Updated Successfully"
        })
    }catch(err){
        res.status(404)
        res.json({
            status: 404,
            message: "User Not Found"
        })
    }
})

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,_destination)
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }   
})

const upload = multer({
    storage: storage
})

router.post('/upload', upload.single('file'), (req,res)=>{
    Image.create({image: req.file.filename})
    .then(result=>res.json(result))
    .catch(err=>console.log(err))
})

router.get('/getImage',(req,res)=>{
    Image.find()
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

router.get('/check-session', (req, res) => {
    if (req.session && req.session.email) {
        res.json({
            isLoggedIn: true,
            email: req.session.email
        });
    } else {
        res.json({
            isLoggedIn: false
        });
    }
});

module.exports = router