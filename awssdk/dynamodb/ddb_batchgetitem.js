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

//snippet-sourcedescription:[ddb_batchgetitem.js demonstrates how to retrieve items from an Amazon DynamoDB table.]
//snippet-service:[dynamodb]
//snippet-keyword:[JavaScript]
//snippet-sourcesyntax:[javascript]
//snippet-keyword:[Code Sample]
//snippet-keyword:[Amazon DynamoDB]
//snippet-sourcetype:[full-example]
//snippet-sourcedate:[2018-06-02]
//snippet-sourceauthor:[AWS-JSDG]

// ABOUT THIS NODE.JS SAMPLE: This sample is part of the SDK for JavaScript Developer Guide topic at
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-example-table-read-write-batch.html

// snippet-start:[dynamodb.JavaScript.batch.GetItem]
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({
    apiVersion: '2012-08-10'
});

var params = {
  RequestItems: {
    'CUSTOMER_LIST': {
      Keys: [
        {
    'CUSTOMER_ID': {N: '001'},
    'CUSTOMER_NAME' : {S:'Richard Roe'}
  },
          {
    'CUSTOMER_ID': {N: '002'},
    'CUSTOMER_NAME' : {S:'Amod Kadam'}
  },
          {
    'CUSTOMER_ID': {N: '003'},
    'CUSTOMER_NAME' : {S:'Steve Jobs'}
  }
         
      ],
      ProjectionExpression: 'CUSTOMER_NAME, EMAIL,AGE '
    }
  }
};

ddb.batchGetItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Data" , data.Responses);
    
    data.Responses.CUSTOMER_LIST.forEach(function(element, index, array) {
      console.log(element);
    });
  }
});
// snippet-end:[dynamodb.JavaScript.batch.GetItem]
