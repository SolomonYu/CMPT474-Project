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
    UserId = event['UserId']
    password = event['password']
    
    if len(UserId) == 0:
        return{
            'statusCode': 400,
            'body': json.dumps('UserId is required to login.')
        }
    
    if len(password) == 0:
        return{
            'statusCode': 400,
            'body': json.dumps('password is required to login.')
        }
    
    response = table.get_item(
        Key={
            'UserId': UserId
        })
    if 'Item' not in response:
        return{
            'statusCode': 400,
            'body': json.dumps('User not found')
        }
    else:
        item = response['Item']
        if item['password'] == password:
            return {
                # returns the entire user object for now
                # can be changed later to not pass the password
                'statusCode': 200,
                'body': json.dumps(item)
            }
        else:
            return{
                'statusCode': 400,
                'body': json.dumps('Invalid login')
            }
