// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Get a list of all purchased phone numbers.
 */

import { PhoneNumbersClient } from "@azure/communication-phone-numbers";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log("\n== Get a Purchased Phone Numbers Sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new PhoneNumbersClient(connectionString);

  const phoneNumbers = await client.listPurchasedPhoneNumbers();

  for await (const phoneNumber of phoneNumbers) {
    console.log(`The phone number id is: ${phoneNumber.id}`);
    console.log(`Phone number type is ${phoneNumber.phoneNumberType}`);
  }
}

main().catch((error) => {
  console.log("The sample encountered an error:", error);
  process.exit(1);
});
