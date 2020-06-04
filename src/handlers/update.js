'use strict';

const dynamodb = require('../utils/dynamodb');

const update = async(event, context) => {
  // 路径: /{stage}/todos/{id}
  // 首先获取路径参数id
  const id = event.pathParameters.id;
  const { title, phase } = JSON.parse(event.body);
  const updatedAt = (new Date()).toISOString();
  // 根据输入的参数更新特定的属性
  let updateExp = ['updatedAt = :updatedAt'];
  if(title) {
    updateExp.push('title = :title');
  }

  if(phase) {
    updateExp.push('phase = :phase');
  }
  
  try {
    // 查看DynamoDB文档 
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#update-property
    // 使用update方法更新特定Item
    const todo = await dynamodb.update({
      TableName: process.env.todoTableName,
      Key: { id },
      UpdateExpression: `SET ${updateExp.join(', ')}`,
      ExpressionAttributeValues: {
        ":title": title,
        ":phase": phase,
        ":updatedAt": updatedAt,
      },
      ReturnValues: 'ALL_NEW'
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({...todo.Attributes}, null, 2)
    };
  } catch(err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    };
  }
};

module.exports.handler = update;
