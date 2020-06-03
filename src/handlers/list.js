'use strict';

const dynamodb = require('../utils/dynamodb');

const list = async(event, context) => {
  try {
    // 查看DynamoDB文档 
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property
    // 使用scan方法查看表数据
    const todos = await dynamodb.scan({
      TableName: 'TodosTable',
      Limit: 10
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(todos, null, 2)
    };
  } catch(err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    };
  }
};

module.exports.handler = list;
