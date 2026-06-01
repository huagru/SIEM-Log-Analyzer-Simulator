// The objective of this parser is to extract IP addresses from Apache log files, to an object.
// The object is exported for use in other modules.


// Import the Node.js fs module to work with files.
const fs = require("fs");

// Import the Node.js path module to work with file paths.
const path = require("path");


// Define the log file path using the path module.
const logFilePath = path.join(
    __dirname,
    "..",
    "logs",
    "log.txt"
);


// Function to parse the log file into an array 
function parseToArray(filePath) {
    // Read the file contents and store them as a single string.
    const content = fs.readFileSync(filePath, "utf8");

    // Split the string into lines. Each line becomes an element in the "records" array.
    const records = content.split("\n");

    return records;

}


const recordsArray = parseToArray(logFilePath);



function parseArrayToObject(array) {
    let events = [];

    for (const record of array) {
        const match = record.match(/\d+\.\d+\.\d+\.\d+/);
        
        if (!match) {
            continue;
        }
        
        events.push({ ip: match[0] });
    }
    
    console.log(events);
    return events;
}

parseArrayToObject(recordsArray);