// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Send an SMS message to 1 or more recipients
 */

import { SmsClient, SmsSendRequest } from "@azure/communication-sms";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log("== Send SMS Message ==");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";

  // create new client
  const client = new SmsClient(connectionString);

  // construct send request
  let phoneNumbers: string[];
  if (process.env.TO_PHONE_NUMBERS !== undefined) {
    phoneNumbers = process.env.TO_PHONE_NUMBERS.split(",")
  }
  else if (process.env.AZURE_PHONE_NUMBER !== undefined) {
    phoneNumbers = [process.env.AZURE_PHONE_NUMBER]
  }
  else {
    phoneNumbers = ["<to-phone-number-1>", "<to-phone-number-2>"]
  }

  const sendRequest: SmsSendRequest = {
    from: process.env.FROM_PHONE_NUMBER || process.env.AZURE_PHONE_NUMBER || "<from-phone-number>",
    to: phoneNumbers,
    message: "Hello World via SMS!"
  };

  // send sms with request
  const sendResults = await client.send(sendRequest);

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
  console.error("Encountered an error while sending SMS: ", error);
  process.exit(1);
});
