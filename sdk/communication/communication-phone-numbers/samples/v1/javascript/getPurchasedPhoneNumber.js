// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Get a purchased phone number.
 */

const { PhoneNumbersClient } = require("@azure/communication-phone-numbers");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  console.log("\n== Get a Purchased Phone Number Sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new PhoneNumbersClient(connectionString);

  // You will need to set any of these environment variables or edit the following values
  const phoneNumberToGet =
    process.env.PHONE_NUMBER_TO_GET || process.env.AZURE_PHONE_NUMBER || "<phone number to get>";

  // get the phone number
  const phoneNumber = await client.getPurchasedPhoneNumber(phoneNumberToGet);

  console.log(`The id is the same as the phone number: ${phoneNumber.id}`);
  console.log(`Phone number type is ${phoneNumber.phoneNumberType}`);
}

main().catch((error) => {
  console.log("The sample encountered an error:", error);
  process.exit(1);
});
