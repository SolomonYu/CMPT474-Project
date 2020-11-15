import json
# AWS SDK
import boto3
from boto3.dynamodb.conditions import Key

# name of the database we are using
# needs to be edited to YOUR database name
LEND_DATABASE_NAME = 'ItemsToLend'
BUY_DATABASE_NAME = 'ItemsToBuy'

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
# use the DynamoDB object to select our table
lendtable = dynamodb.Table(LEND_DATABASE_NAME)
buytable = dynamodb.Table(LEND_DATABASE_NAME)

def lambda_handler(event, context):
    
    lenditems = lendtable.scan()
    buyitems = buytable.scan()

    items = [lenditems['Items'],buyitems['Items']]
    
    
    return{
        'statusCode': 200,
        'body': json.dumps(items)
    }