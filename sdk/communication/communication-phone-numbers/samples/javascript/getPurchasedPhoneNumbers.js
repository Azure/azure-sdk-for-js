// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to us the PhoneNumbersClient
 * to list all purchased phone numbers.
 */

const { PhoneNumbersClient } = require("@azure/communication-phone-numbers");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

// You will need to set this environment variable or edit the following values
const connectionString =
  process.env["COMMUNICATION_CONNECTION_STRING"] || "<communication service connection string>";

async function main() {
  console.log("\n== Get a Purchased Phone Numbers Javascript Sample ==\n");

  // create new client
  const client = new PhoneNumbersClient(connectionString);

  const phoneNumbers = await client.listPurchasedPhoneNumbers();

  for await (const phoneNumber of phoneNumbers) {
    console.log(`The id is the same as the phone number: ${phoneNumber.id}`);
    console.log(`Phone number type is ${phoneNumber.phoneNumberType}`);
  }
}

main().catch((error) => {
  console.error("Encountered an error while updating the phone number: ");
  console.error("Request: \n", error.request);
  console.error("\nResponse: \n", error.response);
  console.error(error);
});
