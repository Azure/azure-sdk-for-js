// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Release a purchased phone number.
 */

import { PhoneNumbersClient } from "@azure/communication-phone-numbers";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log("\n== Release Phone Numbers Sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new PhoneNumbersClient(connectionString);

  // You will need to set this environment variable or edit the following values
  const phoneNumberToRelease = process.env.PHONE_NUMBER_TO_RELEASE || "<phone number to release>";

  // get poller to monitor release
  const releasePoller = await client.beginReleasePhoneNumber(phoneNumberToRelease);

  // Release is underway.
  await releasePoller.pollUntilDone();

  console.log("Successfully release phone number.");
}

main().catch((error) => {
  console.log("The sample encountered an error:", error);
  process.exit(1);
});
