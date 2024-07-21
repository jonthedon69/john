const express = require('express'); 
const app = express(); 
 
// Middleware to log request headers 
app.use((req, res, next) => { 
    // Check if 'Cookie' header exists in the request 
    if (req.headers.cookie) { 
        console.log('Cookies found in the request:'); 
        console.log(req.headers.cookie); 
    } else { 
        console.log('No cookies found in the request.'); 
    } 
    next(); 
}); 
 
// Route handler 
app.get('/', (req, res) => { 
    res.send('Hello World!'); 
}); 
 
// Start the server 
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => { 
    console.log(`Server is listening on port ${PORT}`); 
});