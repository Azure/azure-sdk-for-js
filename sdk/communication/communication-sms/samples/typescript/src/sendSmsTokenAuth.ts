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

// You will need to set this environment variable or edit the following value
const connectionString = process.env["COMMUNICATION_ENDPOINT"] || "<communication endpoint url>";

export const main = async () => {
  console.log("== Send SMS Message Token Auth Sample ==");

  const client = new SmsClient(connectionString, new DefaultAzureCredential());

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
        tag: "TSAuthTokenSample"
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
};

main().catch((error) => {
  console.error("Encountered an error while sending sms: ");
  console.error("Request: \n", error.request);
  console.error("\nResponse: \n", error.response);
});
