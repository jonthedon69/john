// Define an array of car objects 
let cars = [ 
    { make: 'Toyota', model: 'Corolla', year: 2020, color: 'Blue' }, 
    { make: 'Honda', model: 'Civic', year: 2019, color: 'Red' }, 
    { make: 'Ford', model: 'Mustang', year: 2021, color: 'Black' } 
]; 
 
// Function to print the properties of an object 
function printProperties(obj) { 
    for (let key in obj) { 
        console.log(`${key}: ${obj[key]}`); 
    } 
} 
 
// Function to get the length of an object 
function getObjectLength(obj) { 
    return Object.keys(obj).length; 
} 
 
// Iterate over each car in the cars array 
cars.forEach((car, index) => { 
    console.log(`Car ${index + 1} properties:`); 
    printProperties(car); 
    console.log();
   // Delete the second property (in this case, 'model') 
   let propertyKeys = Object.keys(car); 
   delete car[propertyKeys[1]]; 
    

   // Print properties after deletion 
   console.log(`Car ${index + 1} properties after deleting the second property:`); 
   printProperties(car); 
   console.log(); 

   // Get and print the length of the object 
   let length = getObjectLength(car); 
   console.log(`Length of car ${index + 1} object: ${length}`); 
   console.log('--------------------------'); 
}); 