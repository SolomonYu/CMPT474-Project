from decimal import Decimal
from pprint import pprint
import json
import boto3
from botocore.exceptions import ClientError

# name of the database we are using
# needs to be edited to YOUR database name
LEND_DATABASE_NAME = 'ItemsToLend'
BUY_DATABASE_NAME = 'ItemsToBuy'

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):

    itemId = event['itemId']
    lend = event['lend']
    buy = event['buy']
    # use the DynamoDB object to select our table
    if lend:
        table = dynamodb.Table(LEND_DATABASE_NAME)
    elif buy:
        table = dynamodb.Table(BUY_DATABASE_NAME)

    response = table.delete_item(
        Key={
            'ItemId': itemId
        })

    responseObj = {}
    responseObj['statusCode'] = 200
    responseObj['headers'] = {}
    responseObj['headers']['Content-type'] = 'application/json'
    responseObj['body'] = json.dumps(response)

    return responseObj
