'use strict';

const dynamodb = require('../utils/dynamodb');

const remove = async(event, context) => {
  // 路径: /{stage}/todos/{id}
  // 首先获取路径参数id
  const id = event.pathParameters.id;
  try {
    // 查看DynamoDB文档 
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#delete-property
    // 使用delete方法删除特定Item
    await dynamodb.get({
      TableName: process.env.todoTableName,
      Key: { id }
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Deleted item(${id})`
      }, null, 2)
    };
  } catch(err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    };
  }
};

module.exports.handler = remove;
