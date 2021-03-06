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

//snippet-sourcedescription:[ddb_scan.js demonstrates how to return items and attributes from an Amazon DynamoDB table.]
//snippet-service:[dynamodb]
//snippet-keyword:[JavaScript]
//snippet-sourcesyntax:[javascript]
//snippet-keyword:[Code Sample]
//snippet-keyword:[Amazon DynamoDB]
//snippet-sourcetype:[full-example]
//snippet-sourcedate:[2018-06-02]
//snippet-sourceauthor:[AWS-JSDG]

// ABOUT THIS NODE.JS SAMPLE: This sample is part of the SDK for JavaScript Developer Guide topic at
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-example-query-scan.html

// snippet-start:[dynamodb.JavaScript.table.scan]
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

AWS.config.update({region: 'ap-south-1'});

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({
                apiVersion: '2012-08-10',
                endpoint: 'http://localhost:8000'});

var params = {
  ExpressionAttributeValues: {
/*':id': {N: '003'},
    ':name' : {S: 'Steve Jobs'},*/
    ':age' : {N:'30'}
  },
 //KeyConditionExpression: 'CUSTOMER_ID = :id and CUSTOMER_NAME =  :name',
  ProjectionExpression: 'CUSTOMER_NAME, EMAIL, AGE',
  FilterExpression: "AGE > :age",
  TableName: 'CUSTOMER_LIST'
};


ddb.scan(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    //console.log("Success", data.Items);
    data.Items.forEach(function(element, index, array) {
     console.log(element.EMAIL.S + " (" + element.AGE.N + ")");
    });
  }
});
// snippet-end:[dynamodb.JavaScript.table.scan]

