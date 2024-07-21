const { MongoClient } = require('mongodb');
const readlineSync = require('readline-sync');

// MongoDB connection URL and database name
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'schoolDB';

// Function to get student data from the user
function getStudentData() {
    return {
        usn: readlineSync.question('Enter USN: '),
        name: readlineSync.question('Enter Name: '),
        sem: readlineSync.question('Enter Semester: '),
        year_of_admission: readlineSync.question('Enter Year of Admission: ')
    };
}

// Function to insert student data into MongoDB
async function insertStudentData(studentData) {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db(dbName);
        const result = await db.collection('students').insertOne(studentData);
        console.log('Student data inserted with _id:', result.insertedId);
    } catch (err) {
        console.error('Error inserting data:', err);
    } finally {
        await client.close();
    }
}

// Main function to run the script
(async function() {
    const studentData = getStudentData();
    await insertStudentData(studentData);
})();
