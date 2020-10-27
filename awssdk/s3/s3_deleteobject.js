// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

//Method -1 :read credentials from default profile
var credentials = new AWS.SharedIniFileCredentials();
AWS.config.credentials = credentials;

// set logging
// Require logplease
const logplease = require('logplease');
// Set external log file option
logplease.setLogfile('debug.log');
// Set log level
logplease.setLogLevel('DEBUG');

const options = {
  useColors: true,     // Enable colors
  showTimestamp: true, // Display timestamp in the log message
  useLocalTime: true, // Display timestamp in local timezone
  showLevel: true,     // Display log level in the log message
  filename: 'debug.log',      // Set file path to log to a file
  appendFile: true,    // Append logfile instead of overwriting
};
// Create logger
const logger = logplease.create('s3-logger',options);

// Assign logger to SDK
AWS.config.logger = logger;

// Create S3 service object
var s3 = new AWS.S3({apiVersion: '2006-03-01'});


var params = {
  Bucket: "temp27101756", 
  Key: "debug.log"
 };
 
 s3.deleteObject(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data);           // successful response
   
 });