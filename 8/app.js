const express = require('express'); 
const app = express(); 
const PORT = 3000; 

// Route to find prime numbers less than 100 
app.get('/find_prime_100', (req, res) => { 
  let html = '<h1>Prime Numbers Less Than 100</h1>'; 
  html += '<ul>'; 
  for (let i = 2; i < 100; i++) { 
    let isPrime = true; 
    for (let j = 2; j <= Math.sqrt(i); j++) { 
      if (i % j === 0) { 
        isPrime = false; 
        break; 
      } 
    } 
    if (isPrime) { 
      html += `<li>${i}</li>`; 
    } 
  } 
  html += '</ul>'; 
  res.send(html); 
}); 

// Route to find cubes less than 100 
app.get('/find_cube_100', (req, res) => { 
  let html = '<h1>Cubes Less Than 100</h1>'; 
  html += '<ul>'; 
  for (let i = 1; i < 100; i++) { 
    const cube = i * i * i; 
    if (cube < 100) { 
      html += `<li>${cube}</li>`; 
    } else { 
      break; // No need to continue if cube exceeds 100 
    } 
  } 
  html += '</ul>'; 
  res.send(html); 
}); 

// Start server 
app.listen(PORT, () => { 
  console.log(`Server is running on http://localhost:${PORT}`); 
});
