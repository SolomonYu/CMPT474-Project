from __future__ import print_function
import boto3

# Create SQS client
sqs = boto3.client('sqs')

# ADD YOUR OWN URL
queue_url = 'https://sqs.us-east-1.amazonaws.com/127228530235/UserInfoQueue'

def lambda_handler(event, context):
    for record in event['Records']:
        # Send message when new record is inserted
        if record['eventName'] == 'INSERT':
            
            # Print in CloudWatch logs 
            print(record['eventID'])
            print(record['eventName'])

            UserId = record['dynamodb']['NewImage']['UserId']['S']
            email = record['dynamodb']['NewImage']['email']['S']
            
            # Send message to SQS queue
            response = sqs.send_message(
                QueueUrl=queue_url,
                DelaySeconds=0,
                MessageAttributes={
                    'UserId': {
                        'DataType': 'String',
                        'StringValue': UserId
                    },
                    'email': {
                        'DataType': 'String',
                        'StringValue': email
                    }
                },
                MessageBody=(
                    'User name and email to add to post.'
                )
            )
            print(response['MessageId'])
    
    print('Successfully processed %s records.' % str(len(event['Records'])))
    
