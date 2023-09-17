const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const collection = require("./mongo")
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const port = 3000;

const secretKey = crypto.randomBytes(32).toString('hex');

app.use(bodyParser.json());
app.use(cors());
app.use(
    session({
      secret: secretKey,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 3600000, 
      },
    })
  );

app.post('/sign', async(req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    const data={
        name: name,
        email:email,
        password:password,
    }

    console.log(name, email, password, confirmPassword);
    if (password !== confirmPassword) {
        return res.status(400).json({ status: 'error', message: 'Password and Confirm Password do not match.' });
    }
    try{
        const check=await collection.findOne({email:email})
    
        if (check) {
            return res.status(400).json({ status: 'error', message: 'Email already exists.' });
        }else{
            await collection.insertMany([data])
            return res.status(201).json({ status: 'success', message: 'User registered successfully.' });
        }   
    }
    catch(err){
        console.log(err)
    }
    
});

app.post('/', async(req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    try{
        const check = await collection.findOne({ email: email });
        
        if (check.email === email && check.password === password) {
                req.session.userEmail = email;
                return res.status(200).json({ status: 'success', message: 'Login success.' });
        }else{
            return res.status(200).json({ status: 'error', message: 'Invalid credentials' });
        }
    }
    catch(err){
        console.log(err)
    }    

});

app.post('/profile', async(req, res) => {
    const { age,dob,gender,mobileno } = req.body;
    const email = req.session.userEmail;
    
    const filter = { email: email }; 

    const update = {
        $set: {
            age: age,
            dob: dob,
            gender: gender,
            mobileno: mobileno,
        },
    };

    console.log(email);
    console.log(update)
    
    try{
        const result = await collection.findOne(filter);

        if (result) {
            await collection.updateOne(filter, update);
            return res.status(201).json({ status: 'success', message: 'Update success.' });
        }else{
            return res.status(201).json({ status: 'error', message: 'Not updated' });
        }   
    }
    catch(err){
        console.log(err)
    }
    
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
