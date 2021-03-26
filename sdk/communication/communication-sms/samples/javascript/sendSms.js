// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use the SmsClient to send
 * an SMS message
 */

const { SmsClient } = require("@azure/communication-sms");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  const connectionString =
    process.env["COMMUNICATION_CONNECTION_STRING"] ||
    "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";
  const client = new SmsClient(connectionString);
  const sendResults = await client.send({
    from: "<from-phone-number>", // Your E.164 formatted phone number used to send SMS
    to: ["<to-phone-number-1>", "<to-phone-number-2>"], // The list of E.164 formatted phone numbers to which message is being sent
    message: "Hello World via SMS!" // The message being sent
  });

  // individual messages can encounter errors during sending
  // use the "successful" property to verify
  for (const sendResult of sendResults) {
    if (sendResult.successful) {
      console.log("Success: ", sendResult);
    } else {
      console.error("Something went wrong when trying to send this message: ", sendResult);
    }
  }
  console.log("== Done: Send SMS Message ==");
}

main().catch((error) => {
  console.error("Encountered an error while sending SMS: ");
  console.error("Request: \n", error.request);
  console.error("\nResponse: \n", error.response);
});
