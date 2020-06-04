'use strict';

const dynamodb = require('../utils/dynamodb');

const show = async(event, context) => {
  // 路径: /{stage}/todos/{id}
  // 首先获取路径参数id
  const id = event.pathParameters.id;
  try {
    // 查看DynamoDB文档 
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property
    // 使用get方法获取特定Item
    const todo = await dynamodb.get({
      TableName: 'TodosTable',
      Key: { id }
    }).promise();

    // 判断todo是否为空
    if(Object.keys(todo).length) {
      return {
        statusCode: 200,
        body: JSON.stringify(todo, null, 2)
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: 'Todo not found.'
        }, null, 2)
      };
    }
  } catch(err) {
    return {
        statusCode: 500,
        body: JSON.stringify(err)
    };
  }
};

module.exports.handler = show;
