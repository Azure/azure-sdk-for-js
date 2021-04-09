// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Release a purchased phone number.
 */

const { PhoneNumbersClient } = require("@azure/communication-phone-numbers");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  console.log("\n== Release Phone Numbers Sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.AZURE_COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new PhoneNumbersClient(connectionString);

  // You will need to set this environment variable or edit the following values
  const phoneNumberToRelease =
    process.env.AZURE_COMMUNICATION_PHONE_NUMBER_TO_RELEASE ||
    process.env.AZURE_PHONE_NUMBER ||
    "<phone number to release>";

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
