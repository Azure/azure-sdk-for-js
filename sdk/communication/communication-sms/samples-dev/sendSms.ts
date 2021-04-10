// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Send an SMS message to 1 or more recipients
 */

import { SmsClient } from "@azure/communication-sms";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main () {
  const connectionString =
    process.env["COMMUNICATION_CONNECTION_STRING"] ||
    "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";
  const client = new SmsClient(connectionString);
  const sendResults = await client.send({
    // Phone numbers must be in E.164 format
    from: "<from-phone-number>", 
    to: ["<to-phone-number-1>", "<to-phone-number-2>"],
    message: "Hello World via SMS!"
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
};

main().catch((error) => {
  console.error("Encountered an error while sending SMS: ");
  console.error("Request: \n", error.request);
  console.error("\nResponse: \n", error.response);
});
