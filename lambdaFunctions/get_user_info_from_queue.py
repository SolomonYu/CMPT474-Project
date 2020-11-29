import json
import boto3

# name of the database we are using
# UPDATE IF NEEDED
USER_DATABASE_NAME = 'UserPosts'

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
# use the DynamoDB object to select our table
table = dynamodb.Table(USER_DATABASE_NAME)


# gets message from queue
def lambda_handler(event, context):
    message = event['Records'][0]['messageAttributes']
    user_id = message['UserId']['stringValue']
    email = message['email']['stringValue']
    #print(user_id)
    #print(email)
    
    # Add to UserPosts Table
    response = table.put_item(
        Item={
            'UserId': user_id,
            'email' : email,
        })

    return {
        'statusCode': 200,
        'body': json.dumps('Processed message from queue and added to UserPosts')
    }