'use strict';
const fetch = require('node-fetch');
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

const client = new SNSClient({
  region: "eu-west-2",
  signatureVersion: "v4"
});

module.exports.checkAge = async (event) => {
  const resp = await fetch('https://www.nhs.uk/conditions/coronavirus-covid-19/coronavirus-vaccination/book-coronavirus-vaccination/');
  const body = await resp.text();
  const age = body.match(/aged (\d+) or/)[1];
  let smsSent = false;

  if (parseInt(age) <= parseInt(process.env.AGE_TARGET)) {
    const params = {
      PhoneNumber: process.env.PHONE_NUMBER,
      Message: `NHS vaccination age now: ${age}`
    };
    const data = await client.send(new PublishCommand(params));
    smsSent = true;
  }
  console.log(`NHS vaccination age now: ${age}; SMS sent: ${smsSent}`);

  return { message: `NHS vaccination age now: ${age}; SMS sent: ${smsSent}`, event };
};
