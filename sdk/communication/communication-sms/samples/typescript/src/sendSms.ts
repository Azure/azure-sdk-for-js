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
  const from = "<phone number>";

  // The list of E.164 formatted phone numbers to which message is being send
  const to = ["<phone number>"];

  // The message being sent
  const message = "Hey!";

  console.log("-- Sending SMS --");

  // Send SMS message
  await client.send({ from, to, message });

  console.log("Message sent!");
};

main().catch((error) => {
  console.error("Encountered an error while sending sms: ", error);
});
