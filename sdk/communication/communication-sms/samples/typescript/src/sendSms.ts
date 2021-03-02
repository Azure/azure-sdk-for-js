// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use the SmsClient to send
 * a SMS message
 */

import { SmsClient } from "@azure/communication-sms";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set this environment variables or edit the following values
const connectionString =
  process.env["COMMUNICATION_CONNECTION_STRING"] || "<communication service connection string>";

export const main = async () => {
  console.log("== Send SMS Message Sample ==");

  const client = new SmsClient(connectionString);

  // Send SMS message
  const sendResults = await client.send({ 
      from: "<phone number>", // Your E.164 formatted phone number used to send SMS
      to: ["<phone number>", "<phone number>", "<phone number>"], // The list of E.164 formatted phone numbers to which message is being send
      message: "Hello World via SMS!" // The message being sent
    }, { 
      enableDeliveryReport: true, 
      tag: "customTag" 
    });

  for (const sendResult of sendResults) {
    console.log(`MessageId: ${sendResult.messageId} Sent to: ${sendResult.to}`);
  }
};

main().catch((error) => {
  console.error("Encountered an error while sending sms: ", error);
});
