import json
# AWS SDK
import boto3
from boto3.dynamodb.conditions import Key
import uuid
import time

# name of the database we are using
# needs to be edited to YOUR database name
LEND_DATABASE_NAME = 'ItemsToLend'
BUY_DATABASE_NAME = 'ItemsToBuy'
USER_DATABASE_NAME = 'Users'

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):

    # get values from api input
    # title = event['title']
    description = event['description']
    userId = event['UserId']
    # location_city = event['location_city']
    # location_province = event['location_province']
    # date_posted = event['date_posted']
    lend = event['lend']
    buy = event['buy']    
    # monetary = event['monetary'] 
    #     # boolean to decide whether for sell or borrow 

    # retrieve information via user profile
    email = dynamodb.Table(USER_DATABASE_NAME).get_item(
        Key = {'UserId': userId},
        ProjectionExpression = 'email'
        )['Item']['email']
    
    date_posted = time.ctime() 

    # use the DynamoDB object to select our table
    if lend:
        table = dynamodb.Table(LEND_DATABASE_NAME)
        response = table.put_item(
            Item = {
                # 'LendItemId': "L" + str(uuid.uuid4()),
                'ItemId': str(uuid.uuid4().hex),
                # 'title': title,
                'description': description,
                'userId': userId,
                'email': email,
                # 'location_city': location_city,
                # 'location_province': location_province,
                'date_posted': date_posted,
                # 'monetary': monetary,
                'available': True
                    # if items are assumed to be always available when first posted,
                    # available is True by default
            })
    elif buy:
        table = dynamodb.Table(BUY_DATABASE_NAME)
        price = event['price']
        response = table.put_item(
            Item = {
                # 'BuyItemId': "B" + str(uuid.uuid4()), easier to differentiate b/t buy/ lend w/o having to pass in two booleans
                'ItemId': str(uuid.uuid4().hex),
                # 'title': title,
                'description': description,
                'userId': userId,
                'email': email,
                'price': price,
                # 'location_city': location_city,
                # 'location_province': location_province,
                'date_posted': date_posted,
                # 'monetary': monetary,
                'available': True
                    # if items are assumed to be always available when first posted,
                    # available is True by default
            })

    responseObj = {}
    responseObj['statusCode'] = 200
    responseObj['headers'] = {}
    responseObj['headers']['Content-type'] = 'application/json'
    responseObj['body'] = json.dumps(response)

    return responseObj
