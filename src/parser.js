// The objective of this parser is to extract IP addresses from Apache log files, to an object.
// The object then is exported to be used by the analyzer.


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


// Here the function is called to parse the log file into an array. Each element is a line from the log file.
const recordsArray = parseToArray(logFilePath);


// Function to parse the array into an object
function parseArrayToObject(array) {
    let events = [];
    
    // This regex line separates the different parts of the log entry.
    const regex = /APACHE\s+(\d+\.\d+\.\d+\.\d+)\s+-\s+-\s+\[([^\]]+)\]\s+"(\w+)\s+([^"]+?)\s+(HTTP\/[\d.]+)"\s+(\d+)\s+(\d+)\s+"[^"]*"\s+"([^"]*)"/;


    for (const record of array) {
        const match = record.match(regex);
        
        if (!match) {
            continue;
        }
        
        events.push({ 
            ip: match[1],
            timestamp: match[2],
            method: match[3],
            resource: match[4],
            protocol: match[5],
            status: Number(match[6]),
            bytes: Number(match[7]),
            userAgent: match[8]
         });
    }
    
    console.log(events);
    return events;
}

parseArrayToObject(recordsArray);

