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

  // Your E.164 formatted phone number used to send SMS
  const from = "+12345678901";

  // The list of E.164 formatted phone numbers to which message is being send
  const to = ["+12345678901", "+14251234567", "+12061234567"];

  // The message being sent
  const message = "Hello World via SMS!";

  // Send SMS message
  const sendResults = client.send(
    { from, to, message },
    { enableDeliveryReport: true, tag: "customTag" }
  );
  for await (const sendResult of sendResults) {
    console.log(`MessageId: ${sendResult.messageId} Sent to: ${sendResult.to}`);
  }
};

main().catch((error) => {
  console.error("Encountered an error while sending sms: ", error);
});
