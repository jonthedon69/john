const fs = require('fs'); 
const readline = require('readline'); 
const path = require('path'); 
 
// Create readline interface for user input 
const rl = readline.createInterface({ 
    input: process.stdin, 
    output: process.stdout 
}); 
 
// Define the directory path where files will be stored 
const directoryPath = './data'; 
 
// Create directory if it does not exist 
if (!fs.existsSync(directoryPath)) { 
    fs.mkdirSync(directoryPath); 
} 
 
// Function to create a file 
function createFile(fileName, data) { 
    const filePath = path.join(directoryPath, fileName); 
    fs.writeFile(filePath, data, (err) => { 
        if (err) { 
            console.error('Error creating file:', err); 
            return; 
        } 
        console.log('File created successfully.'); 
        rl.close(); 
    }); 
} 
 
// Function to read a file
function readFile(fileName) { 
    const filePath = path.join(directoryPath, fileName); 
    fs.readFile(filePath, 'utf8', (err, data) => { 
        if (err) { 
            console.error('Error reading file:', err); 
            return; 
        } 
        console.log('File content:'); 
        console.log(data); 
        rl.close(); 
    }); 
} 
 
// Function to update a file 
function updateFile(fileName, newData) { 
    const filePath = path.join(directoryPath, fileName); 
    fs.writeFile(filePath, newData, (err) => { 
        if (err) { 
            console.error('Error updating file:', err); 
            return; 
        } 
        console.log('File updated successfully.'); 
        rl.close(); 
    }); 
} 
 
// Function to delete a file 
function deleteFile(fileName) { 
    const filePath = path.join(directoryPath, fileName); 
    fs.unlink(filePath, (err) => { 
        if (err) { 
            console.error('Error deleting file:', err); 
            return; 
        } 
        console.log('File deleted successfully.'); 
        rl.close(); 
    }); 
} 
 
// Prompt user for operation 
rl.question('Enter operation (create/read/update/delete): ', (operation) => { 
    switch (operation) { 
        case 'create': 
            rl.question('Enter file name: ', (fileName) => { 
                rl.question('Enter file content: ', (data) => { 
                    createFile(fileName, data); 
                }); 
            }); 
            break; 
        case 'read': 
            rl.question('Enter file name: ', (fileName) => { 
                readFile(fileName); 
            }); 
            break; 
        case 'update': 
            rl.question('Enter file name: ', (fileName) => { 
                rl.question('Enter new file content: ', (newData) => { 
                    updateFile(fileName, newData); 
                }); 
            }); 
            break; 
        case 'delete': 
            rl.question('Enter file name: ', (fileName) => { 
                deleteFile(fileName); 
            }); 
            break; 
        default: 
            console.log('Invalid operation.'); 
            rl.close(); 
    } 
}); 