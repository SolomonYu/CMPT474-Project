import json
# AWS SDK
import boto3

# name of the database we are using
# needs to be edited to YOUR database name
USER_DATABASE_NAME = 'Users'

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
# use the DynamoDB object to select our table
table = dynamodb.Table(USER_DATABASE_NAME)

def lambda_handler(event, context):
    # get values from api input
    username = event['username']
    email = event['email']
    password = event['password']
    
    response = table.put_item(
        Item={
            'username': username,
            'email' : email,
            'password' : password
        })
    
    return {
        'statusCode': 200,
        'body': json.dumps('Successful registration')
    }