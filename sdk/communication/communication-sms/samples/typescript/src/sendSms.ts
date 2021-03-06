// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use the SmsClient to send
 * a SMS message
 */

import { SmsClient } from "@azure/communication-sms";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config({
  path: "sample.env"
});

export const createSmsClient = () => {
  // You will need to set this environment variable or edit the following value
  const connectionString =
    process.env["COMMUNICATION_CONNECTION_STRING"] ||
    "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";
  return new SmsClient(connectionString);
};

export const createSmsClientWithToken = () => {
  // You will need to set this environment variable or edit the following value
  const endpoint =
    process.env["COMMUNICATION_ENDPOINT"] || "https://<resource-name>.communication.azure.com";
  //AZURE_CLIENT_SECRET, AZURE_CLIENT_ID and AZURE_TENANT_ID environment variables are needed to create a DefaultAzureCredential object.
  return new SmsClient(endpoint, new DefaultAzureCredential());
};

export const sendingSmsMessage = async () => {
  console.log("== Send SMS Message, Default Options ==");
  const client = createSmsClient();
  const sendResults = await client.send({
    from: "<from-phone-number>", // Your E.164 formatted phone number used to send SMS
    to: ["<to-phone-number-1>", "<to-phone-number-2>"], // The list of E.164 formatted phone numbers to which message is being sent
    message: "Hello World via SMS!" // The message being sent
  });

  for (const sendResult of sendResults) {
    if (sendResult.successful) {
      console.log("Success: ", sendResult);
    } else {
      console.error("Something went wrong when trying to send this message: ", sendResult);
    }
  }
  console.log("== Done: Send SMS Message, Default Options ==");
};

export const sendingSmsMessageWithOptions = async () => {
  console.log("== Send SMS Message With Options ==");
  const client = createSmsClient();
  const sendResults = await client.send(
    {
      from: "<from-phone-number>", // Your E.164 formatted phone number used to send SMS
      to: ["<to-phone-number-1>", "<to-phone-number-2>"], // The list of E.164 formatted phone numbers to which message is being sent
      message: "Hello World via SMS!" // The message being sent
    },
    {
      enableDeliveryReport: true,
      tag: "TypeScriptSMSSample"
    }
  );

  for (const sendResult of sendResults) {
    if (sendResult.successful) {
      console.log("Success: ", sendResult);
    } else {
      console.error("Something went wrong when trying to send this message: ", sendResult);
    }
  }
  console.log("== Done: Send SMS Message With Options ==");
};

export const main = async () => {
  console.log("== Send SMS Message Sample ==");
  await sendingSmsMessage();
  await sendingSmsMessageWithOptions();
  console.log("== SMS Sample Complete! ==");
};

main().catch((error) => {
  console.error("Encountered an error while sending sms: ");
  console.error("Request: \n", error.request);
  console.error("\nResponse: \n", error.response);
});
