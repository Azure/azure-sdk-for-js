// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to us the PhoneNumberAdministrationClient
 * to release phone numbers that have been acquired.
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

  console.log("Getting acquired phone numbers.");

  // get the list of acquired phone numbers
  const phoneNumbers = await phoneNumberClient.listPhoneNumbers();
  const phoneNumbersToRelease = [];

  console.log("Searching for phone numbers to release.");

  // get toll free phone numbers with the sms outbound (A2P) capability as their only capability
  // we will release these
  for await (const acquired of phoneNumbers) {
    if (
      acquired.acquiredCapabilities.length === 4 &&
      acquired.acquiredCapabilities.includes("Azure") &&
      acquired.acquiredCapabilities.includes("ThirdPartyAppAssignment") &&
      acquired.acquiredCapabilities.includes("TollFree") &&
      acquired.acquiredCapabilities.includes("OutboundA2PSms")
    ) {
      phoneNumbersToRelease.push(acquired.phoneNumber);
      break;
    }
  }

  console.log(`Found ${phoneNumbersToRelease.length} phone number(s) to release.`);

  if (phoneNumbersToRelease.length) {
    // create release poller
    const releasePoller = await phoneNumberClient.beginReleasePhoneNumbers(phoneNumbersToRelease);

    console.log("Releasing phone numbers.");

    // poll until phone numbers are released.
    await releasePoller.pollUntilDone();

    console.log("Phone numbers released successfully.");
  } else {
    throw new Error("Did not find any phone numbers to release.");
  }
}

main().catch((error) => {
  console.error("Encountered an error while releasing phone numbers: ");
  console.error("Request: \n", error.request);
  console.error("\nResponse: \n", error.response);
  console.error(error);
});
