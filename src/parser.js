
// Require fs to work with the file system. 
const fs = require("fs");

// Require path to work with file and directory paths.
const path = require("path");

// Function to read the log file and return its content as an array of each entry in the log.
function parseToArray(filePath) {
    const content = fs.readFileSync(filePath, "utf8");
    return content.split("\n");
}


// Function that takes an array of log entries and parses each entry into an object with the relevant information extracted using a regular expression. 
// The function returns an array of these objects, which represent the structured data from the log file.
function parseArrayToObject(array) {
    const events = [];

    /* This regex rule matches log entries that follow a specific format, extracting the IP address, 
     timestamp, HTTP method, resource, protocol, status code, bytes sent, and user agent from each log entry. */
    const regex = /APACHE\s+(\d+\.\d+\.\d+\.\d+)\s+-\s+-\s+\[([^\]]+)\]\s+"(\w+)\s+([^"]+?)\s+(HTTP\/[\d.]+)"\s+(\d+)\s+(\d+)\s+"[^"]*"\s+"([^"]*)"/;

    // Loop through each log entry and apply the regex to extract the relevant information and push it into the events array.
    for (const record of array) {
        const match = record.match(regex);

        if (!match) continue; // If the log entry doesn't match the expected format, skip it.
        
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

    return events;
}


/* Function that combines the previous two functions to read a log file, parse its content into an array of log entries, 
 and then convert that array into an array of structured objects representing each log entry. 
 The function takes the file path as an argument and returns the array of parsed log entries as objects.*/
function parseLogFile(filePath) {
    const recordsArray = parseToArray(filePath);
    return parseArrayToObject(recordsArray);
}


// Export the parseLogFile function for use in other modules.
module.exports = parseLogFile;