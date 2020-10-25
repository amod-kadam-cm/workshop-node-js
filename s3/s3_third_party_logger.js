// Require AWS Node.js SDK
const AWS = require('aws-sdk')
// Require logplease
const logplease = require('logplease');
// Set external log file option
//logplease.setLogfile('debug.log');
// Set log level
logplease.setLogLevel('DEBUG');
// Create logger

const options = {
  useColors: true,     // Enable colors
  color: logplease.Colors.White, 
  showTimestamp: true, // Display timestamp in the log message
  useLocalTime: true, // Display timestamp in local timezone
  showLevel: true,     // Display log level in the log message
  filename: 'debug.log',      // Set file path to log to a file
  appendFile: true,    // Append logfile instead of overwriting
};

const logger = logplease.create('logger name',options);
// Assign logger to SDK
AWS.config.logger = logger;

//read credentials from default profile
var credentials =  new AWS.SharedIniFileCredentials();

// read credentials from shared file
//var credentials = new AWS.SharedIniFileCredentials({ profile: 'temp_training' });

// Set credentials and Region
var s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    region: 'us-east-1', 
    credentials: credentials
  });
  

// Call S3 to list the buckets
s3.listBuckets(function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Buckets);
    logger.log("Success", data.Buckets);
    logger.error("This is an error");
  }
});