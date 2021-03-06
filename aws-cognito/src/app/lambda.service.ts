import {Injectable} from '@angular/core';
import * as AWS from 'aws-sdk';

const region = 'us-east-1';
const identityPoolId = 'us-east-1:90d807d9-4b7a-45c6-bcf1-dc5f5c489c34';
AWS.config.region = region;

@Injectable()
export class LambdaService {

  constructor() {
  }

  invokeLambda(token: string) {
    console.log('invokeLambda', token);
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: identityPoolId,
      Logins: {
        'accounts.google.com': token
      }
    });
    // const lambda = new AWS.Lambda();
    const lambda = new AWS.Lambda({region: region, apiVersion: '2015-03-31'});
    const pullParams = {
      FunctionName: 'sepLambda',
      InvocationType: 'RequestResponse',
      LogType: 'None'
    };
// create variable to hold data returned by the Lambda function
    let pullResults;

    lambda.invoke(pullParams, function (error, data) {
      if (error) {
        console.error('err', error);
      } else {
        console.log('suc', data);
        // pullResults = JSON.parse(data.Payload);
      }
    });
  }
}
