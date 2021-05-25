# What is this?

This is an AWS lambda function that checks NHS England COVID vaccination page to see if you're elgible for jabs. It will send you a SMS notification if the age has reached your desinated threshold. You only need to update `AGE_TARGET` and `PHONE_NUMBER` in `handler.js`.

The default execution interval is every 15 minutes, you can change this in `serverless.yml`.

# How to deploy
Execute `npm install` to install depedencies first.

Set up your Serverless framework environment and AWS credentials, please refer to

- https://www.serverless.com/framework/docs/providers/aws/guide/quick-start/
- https://www.serverless.com/framework/docs/providers/aws/guide/credentials/

Then use `serverless deploy` to deploy the lambda to AWS region specified, which by default is eu-west-2 (London).


Please note there's no killswitch, so you need to remember to remove the lambda AFTER the desired age has been reached, otherwise it'll keep sending you SMS afterwards.
