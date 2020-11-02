/*
Readme
-------
1. Ensure AWS Credentials are configured in your environment
2. Ensure that you have all the required dependencies (aws-sdk),(logplease) used in the code
3. SES is setup in the same region 
4. All email ids ( SENDER_ADDRESS , CC_ADDRESS, TO_ADDRESS must be verified if you are using SES Sandbox)
to be used 
5. To invoke this code use 
   node ses_sendemail.js <SENDER_ADDRESS> <TO_ADDRESS> <CC_ADDRESS> <REPLY_TO_ADDRESS>
*/

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

//Method -1 :read credentials from default profile
var credentials = new AWS.SharedIniFileCredentials();
AWS.config.credentials = credentials;
AWS.config.region = "us-east-1";

// set logging
// Require logplease
const logplease = require('logplease');
// Set log level
logplease.setLogLevel('DEBUG');


const options = {
    useColors: true, // Enable colors
    showTimestamp: true, // Display timestamp in the log message
    useLocalTime: true, // Display timestamp in local timezone
    showLevel: true, // Display log level in the log message
    filename: 'ses-debug.log', // Set file path to log to a file
    appendFile: true, // Append logfile instead of overwriting
};
// Create logger
const logger = logplease.create('logger', options);

// Assign logger to SDK
AWS.config.logger = logger;

var SENDER_ADDRESS = process.argv[2];
var TO_ADDRESS = process.argv[3];
var CC_ADDRESS = process.argv[4];
var REPLY_TO_ADDRESS = process.argv[5];


// Create sendEmail params 
var params = {
    Destination: { /* required */
        CcAddresses: [
            CC_ADDRESS
        ],
        ToAddresses: [
            TO_ADDRESS,
        ]
    },
    Message: { /* required */
        Body: { /* required */
            Html: {
                Charset: "UTF-8",
                Data: "<html><h1>Welcome to SES<h1></html>"
            },
            Text: {
                Charset: "UTF-8",
                Data: "Welcome to SES"
            }
        },
        Subject: {
            Charset: 'UTF-8',
            Data: 'Test email'
        }
    },
    Source: SENDER_ADDRESS,
    /* required */
    ReplyToAddresses: [
        REPLY_TO_ADDRESS
        /* more items */
    ],
};

// Create the promise and SES service object
var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();

// Handle promise's fulfilled/rejected states
sendPromise.then(
    function(data) {
        console.log(data.MessageId);
        logger.log(data.MessageId);
    }).catch(
    function(err) {
        console.error(err, err.stack);
        logger.error(err,err.stack);
    });
