const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();

/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 */

exports.handler = async(event, context) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    let body;
    console.log('customer_id :', event.body);
    
    body = JSON.parse(event.body)
    console.log('customer_id :', body.id);
        
    let statusCode = '200';
    const headers = {
        'Content-Type': 'application/json',
    };
    try {

        var params = {
            TableName: 'CUSTOMER_LIST',

            Item: {
                'CUSTOMER_ID': body.id,
                'CUSTOMER_NAME': body.name,
                'DAYS_OF_TRAINING': body.days
            }
        };

        body = await dynamo.put(params).promise();

    }
    catch (err) {
        statusCode = '400';
        body = err.message;
    }
    finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };
};
