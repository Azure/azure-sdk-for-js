// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to us the PhoneNumberAdministrationClient
 * to release phone numbers.
 */

const { PhoneNumberAdministrationClient } = require("@azure/communication-administration");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

// You will need to set this environment variables or edit the following values
const connectionString =
  process.env["COMMUNICATION_CONNECTION_STRING"] || "<communication service connection string>";

async function main() {
  console.log("\n== Release Phone Numbers Javascript Sample ==\n");

  // create an instance of PhoneNumberAdministrationClient
  const phoneNumberClient = new PhoneNumberAdministrationClient(connectionString);

  // Release a phone numbers
  const releasePoller = await phoneNumberClient.beginReleasePhoneNumbers([
    "+14125550100",
    "+14125550101"
  ]);
  console.log("Releasing phone numbers...");

  await releasePoller.pollUntilDone();

  console.log("Release succeeded.");
}

main().catch((error) => {
  console.error("Encountered an error while releasing phone numbers: ");
  console.error("Request: \n", error.request);
  console.error("\nResponse: \n", error.response);
  console.error(error);
});
