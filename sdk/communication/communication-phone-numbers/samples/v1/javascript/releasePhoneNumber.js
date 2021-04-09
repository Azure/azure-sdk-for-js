// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Release a purchased phone number.
 */

const { PhoneNumbersClient } = require("@azure/communication-phone-numbers");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

export const main = async () => {
  console.log("\n== Release Phone Numbers Sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  try {
    // create new client
    const client = new PhoneNumbersClient(connectionString);

    // You will need to set this environment variable or edit the following values
    const phoneNumberToRelease = process.env.PHONE_NUMBER_TO_RELEASE || "<phone number to release>";

    // get poller to monitor release
    const releasePoller = await client.beginReleasePhoneNumber(phoneNumberToRelease);

    // Release is underway.
    await releasePoller.pollUntilDone();
    console.log("Successfully release phone number.");
  } catch (error) {
    console.log("The sample encountered an error:");
    console.error(error);
  }
};

main();
