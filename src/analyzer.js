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

/*The data received has the following structure:
 {
    ip: '192.168.1.10',
    timestamp: '10/May/2026:08:13:12 +0000',
    method: 'GET',
    resource: '/login',
    protocol: 'HTTP/1.1',
    status: 304,
    bytes: 211,
    userAgent: 'Mozilla/5.0'
  },*/


// Function that loops through the logs and generates the analysis
function analyze(logs) {
  const total = logs.length;

  const statusCount = {};
  const methodCount = {};
  const ipCount = {};
  const resourceCount = {};

  // Loop through each log entry and update the counts.
  for (const log of logs) {
    statusCount[log.status] = (statusCount[log.status] || 0) + 1;
    methodCount[log.method] = (methodCount[log.method] || 0) + 1;
    ipCount[log.ip] = (ipCount[log.ip] || 0) + 1;
    resourceCount[log.resource] = (resourceCount[log.resource] || 0) + 1;
  }

  return {
    total,
    statusCount,
    methodCount,
    ipCount,
    resourceCount
  };
}

console.log(analyze(events).total)
console.log(analyze(events).statusCount)
console.log(analyze(events).methodCount)
console.log(analyze(events).ipCount)
console.log(analyze(events).resourceCount)

module.exports = { analyze };
