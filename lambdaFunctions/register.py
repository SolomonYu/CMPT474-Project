import json
# AWS SDK
import boto3
from hashlib import sha256

# name of the database we are using
# needs to be edited to YOUR database name
USER_DATABASE_NAME = 'Users'

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
# use the DynamoDB object to select our table
table = dynamodb.Table(USER_DATABASE_NAME)

def lambda_handler(event, context):
    # get values from api input
    UserId = event['UserId']
    email = event['email']
    password = event['password']
    response = table.get_item(
        Key={
            'UserId': UserId
        })
    if 'Item' in response:
        return{
            'statusCode': 400,
            'body': json.dumps('User already exists')
        }
    else:
        hashedpw = password.encode('utf-8')
        hashedpw = sha256(hashedpw).hexdigest()
        response = table.put_item(
            Item={
                'UserId': UserId,
                'email' : email,
                'password' : hashedpw
            })
        
        return {
            'statusCode': 200,
            'body': json.dumps('Successful registration')
        }