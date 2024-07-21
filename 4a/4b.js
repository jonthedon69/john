const { MongoClient } = require('mongodb'); 
const readline = require('readline'); 
 
// Create readline interface for user input 
const rl = readline.createInterface({ 
    input: process.stdin, 
    output: process.stdout 
}); 
 
// Connection URI 
const uri = 'mongodb://127.0.0.1:27017'; 
 
async function main() { 
    const client = new MongoClient(uri); 
 
    try { 
        // Connect to MongoDB 
        await client.connect(); 
 
        // Ask user for partial name 
        rl.question('Enter partial name to search: ', async (partialName) => { 
            // Select the database 
            const db = client.db('schoolDB'); // Replace 'studentsDB' with your database name 
 
            // Get the students collection 
            const collection = db.collection('students'); // Replace 'students' with your collection name
            // Search for documents with names containing the partial name 
            const query = { name: { $regex: partialName, $options: 'i' } }; // Case-insensitive regex
            const students = await collection.find(query).toArray(); 
 
            // Print the matching student documents 
            console.log(`Matching student documents with partial name "${partialName}":`); 
            console.log(students); 
 
            // Close the connection 
            await client.close(); 
 
            // Close readline interface 
            rl.close(); 
        }); 
    } catch (error) { 
        console.error('Error:', error); 
        rl.close(); 
    } 
} 
 
main(); 