// server.js 
const express = require('express'); 
const bodyParser = require('body-parser'); 
const path = require('path'); // Import path module to handle file paths 
const app = express(); 
const PORT = 3000; 
// Middleware 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
// Route to serve index.html when accessing root route 
app.get('/', (req, res) => { 
res.sendFile(path.join(__dirname, 'index.html')); 
}); 
// Route to receive data from client 
app.post('/fruitData', (req, res) => { 
const { name, price } = req.body; 
console.log(`Received data from client - Name: ${name}, Price: ${price}`); 
// Here you can process the received data as per your requirements 
// For now, let's just send a success response 
res.status(200).send('Data received successfully'); 
}); 
// Start server 
app.listen(PORT, () => { 
    console.log(`Server is running on http://localhost:${PORT}`); 
}); 