const express = require('express'); 
const bodyParser = require('body-parser'); 
const bcrypt = require('bcryptjs'); 
const mongoose = require('mongoose'); 
const app = express(); 
const PORT = 3000; 
// Connect to MongoDB 
mongoose.connect('mongodb://127.0.0.1:27017/authentication', { 
useNewUrlParser: true, 
useUnifiedTopology: true, 
}); 
const db = mongoose.connection; 
db.on('error', console.error.bind(console, 'MongoDB connection error:')); 
db.once('open', () => { 
console.log('Connected to MongoDB');
}); 
 
// Define user schema 
const userSchema = new mongoose.Schema({ 
  email: { type: String, unique: true, required: true }, 
  password: { type: String, required: true }, 
}); 
const User = mongoose.model('User', userSchema); 
 
// Middleware 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 
 
// Routes 
// Home route 
app.get('/', (req, res) => { 
  res.sendFile(__dirname + '/index.html'); 
}); 
 
// Signup route (POST method) 
app.post('/signup', async (req, res) => { 
  const { email, password } = req.body; 
  // Simple validation 
  if (!email || !password) { 
    return res.status(400).send('Email and password are required'); 
  } 
  try { 
    // Check if email already exists 
    const existingUser = await User.findOne({ email }); 
    if (existingUser) { 
      return res.status(400).send('User already exists'); 
    } 
    // Hash password 
    const hashedPassword = await bcrypt.hash(password, 10); 
    // Create new user 
    const newUser = new User({ email, password: hashedPassword }); 
    await newUser.save();
    res.status(201).send('User created successfully'); 
  } catch (error) { 
    console.error(error); 
    res.status(500).send('Server error'); 
  } 
}); 
 
// Login route (POST method) 
app.post('/login', async (req, res) => { 
  const { email, password } = req.body; 
  // Simple validation 
  if (!email || !password) { 
    return res.status(400).send('Email and password are required'); 
  } 
  try { 
    // Find user by email 
    const user = await User.findOne({ email }); 
    if (!user) { 
      return res.status(401).send('Invalid credentials'); 
    } 
    // Compare passwords 
    const passwordMatch = await bcrypt.compare(password, user.password); 
    if (!passwordMatch) { 
      return res.status(401).send('Invalid credentials'); 
    } 
    res.status(200).send('Login successful'); 
  } catch (error) { 
    console.error(error); 
    res.status(500).send('Server error'); 
  } 
}); 
 
// Start server 
app.listen(PORT, () => { 
  console.log(`Server is running on http://localhost:${PORT}`); 
}); 