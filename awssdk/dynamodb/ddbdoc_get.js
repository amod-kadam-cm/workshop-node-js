/**
 * Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * http://aws.amazon.com/apache2.0/
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/

//snippet-sourcedescription:[ddbdoc_get.js demonstrates how to use a DocumentClient to retrieve a set of attributes for an item in an Amazon DynamoDB table.]
//snippet-service:[dynamodb]
//snippet-keyword:[JavaScript]
//snippet-sourcesyntax:[javascript]
//snippet-keyword:[Code Sample]
//snippet-keyword:[Amazon DynamoDB]
//snippet-sourcetype:[full-example]
//snippet-sourcedate:[2018-06-02]
//snippet-sourceauthor:[AWS-JSDG]

// ABOUT THIS NODE.JS SAMPLE: This sample is part of the SDK for JavaScript Developer Guide topic at
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-example-document-client.html

// snippet-start:[dynamodb.JavaScript.docClient.get]
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-1'});
// set logging
// Require logplease
const logplease = require('logplease');
// Set external log file option
logplease.setLogfile('ddb-debug.log');
// Set log level
logplease.setLogLevel('DEBUG');

const options = {
  useColors: true,     // Enable colors
  showTimestamp: true, // Display timestamp in the log message
  useLocalTime: true, // Display timestamp in local timezone
  showLevel: true,     // Display log level in the log message
  filename: 'ddb_debug.log',      // Set file path to log to a file
  appendFile: true,    // Append logfile instead of overwriting
};
// Create logger
const logger = logplease.create('ddb-logger',options);

// Assign logger to SDK
AWS.config.logger = logger;


// Create DynamoDB document client
var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

var params = {
 TableName: 'CUSTOMER_LIST',
 Key: {
   'CUSTOMER_ID': 3,
   'CUSTOMER_NAME' : 'Steve Jobs'
 }
};

docClient.get(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Item);
  }
});
// snippet-end:[dynamodb.JavaScript.docClient.get]
