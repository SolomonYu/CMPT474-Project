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
    password = event['password']
    
    response = table.get_item(
        Key={
            'username': username
        })
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