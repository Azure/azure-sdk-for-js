// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Opt out 1 or more recipients from receiving SMS messages
 */

import { SmsClient } from "@azure/communication-sms";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log("== Opt Out Add ==");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";

  // create new client
  const client = new SmsClient(connectionString);

  // construct send parameters
  const from =
    process.env.FROM_PHONE_NUMBER || process.env.AZURE_PHONE_NUMBER || "<from-phone-number>";
  let phoneNumbers: string[];
  if (process.env.TO_PHONE_NUMBERS !== undefined) {
    phoneNumbers = process.env.TO_PHONE_NUMBERS.split(",");
  } else if (process.env.AZURE_PHONE_NUMBER !== undefined) {
    phoneNumbers = [process.env.AZURE_PHONE_NUMBER];
  } else {
    phoneNumbers = ["<to-phone-number-1>", "<to-phone-number-2>"];
  }

  // send add opt out request
  const optOutAddResults = await client.getOptOutsClient().add(from, phoneNumbers);

  // individual requests can encounter errors during sending
  // use the "httpStatusCode" property to verify
  for (const optOutAddResult of optOutAddResults) {
    if (optOutAddResult.httpStatusCode == 200) {
      console.log("Success: ", optOutAddResult);
    } else {
      console.error(
        "Something went wrong when trying to send opt out add request: ",
        optOutAddResult,
      );
    }
  }

  console.log("== Done: Opt Out Add ==");
}

main().catch((error) => {
  console.error("Encountered an error while sending opt out add request: ", error);
  process.exit(1);
});
