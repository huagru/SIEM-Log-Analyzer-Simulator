// Require path to work with file and directory paths.
const path = require("path");

// Require the parser module.
const parseLogFile = require("./parser");

// Define the path to the log file using path.join to ensure cross-platform compatibility. 
// The log file is located in the "logs" directory, one level up from the current directory (__dirname).
const logFilePath = path.join(__dirname, "..", "logs", "log.txt");

// Call the parseLogFile function with the path to the log file and store the returned array of 
// parsed log entries in the "events" variable.
const events = parseLogFile(logFilePath);

console.log(events);