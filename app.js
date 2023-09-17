const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const collection = require("./mongo");
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

app.post('/sign', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  
  try {
    const checkEmail = await collection.findOne({ email: email });

    if (checkEmail) {
      return res.status(400).json({ status: 'error', message: 'Email already exists.' });
    } else {
      const newUser = new collection({ name, email, password });
      await newUser.save();
      return res.status(200).json({ status: 'success', message: 'User registered successfully.' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 'error', message: 'Server Error' });
  }
});

app.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await collection.findOne({ email: email, password: password });

    if (user) {
      req.session.userEmail = email;
      return res.status(200).json({ status: 'success', message: 'Login success.' });
    } else {
      return res.status(400).json({ status: 'error', message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 'error', message: 'Server Error' });
  }
});

app.post('/profile', async (req, res) => {
  const { age, dob, gender, mobileno } = req.body;
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

  try {
    const result = await collection.findOneAndUpdate(filter, update, { new: true });

    if (result) {
      return res.status(201).json({ status: 'success', message: 'Update success.' });
    } else {
      return res.status(201).json({ status: 'error', message: 'Not updated' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 'error', message: 'Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





