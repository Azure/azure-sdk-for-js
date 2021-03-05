// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use the SmsClient to send
 * an SMS message
 */

const { SmsClient } = require("@azure/communication-sms");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config({
  path: "sample.env"
});

// You will need to set this environment variables or edit the following values
const connectionEndpoint =
  process.env["COMMUNICATION_ENDPOINT"] || "<communication service endpoint>";

async function main() {
  console.log("== Send SMS Message Token Auth Sample ==");

  //You will also need to have the following environment values defined in order to use the DefaultAzureCredential:
  //AZURE_CLIENT_ID
  //AZURE_CLIENT_SECRET
  //AZURE_TENANT_ID
  const client = new SmsClient(endpoint, new DefaultAzureCredential());

  // Send SMS message
  let sendResults;
  try {
    sendResults = await client.send(
      {
        from: "<leased phone number>", // Your E.164 formatted phone number used to send SMS
        to: [
          "<recipient phone number A>",
          "<recipient phone number B>",
          "NotANumberForDemonstrationPurposes"
        ], // The list of E.164 formatted phone numbers to which message is being sent
        message: "Hello World via SMS!" // The message being sent
      },
      {
        enableDeliveryReport: true,
        tag: "JSAuthTokenSample"
      }
    );
  } catch (e) {
    console.error("Something went wrong when attempting to connect to the SMS Gateway");
    throw e;
  }

  for (const sendResult of sendResults) {
    if (sendResult.successful) {
      console.log("Success: ", sendResult);
    } else {
      console.error("Something went wrong when trying to send this message: ", sendResult);
    }
  }
  console.log("== SMS Token Sample Complete! ==");
}

main().catch((error) => {
  console.error("Encountered an error while sending sms: ");
  console.error("Request: \n", error.request);
  console.error("\nResponse: \n", error.response);
});
