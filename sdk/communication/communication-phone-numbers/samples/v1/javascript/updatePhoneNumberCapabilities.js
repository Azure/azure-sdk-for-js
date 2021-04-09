// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Update the capabilities of a purchased phone number.
 */

const { PhoneNumbersClient } = require("@azure/communication-phone-numbers");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  console.log("\n== Update Phone Number Capabilities Sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.AZURE_COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new PhoneNumbersClient(connectionString);

  // You will need to set this environment variable or edit the following values
  const phoneNumberToUpdate =
    process.env.AZURE_COMMUNICATION_PHONE_NUMBER_TO_UPDATE ||
    process.env.AZURE_PHONE_NUMBER ||
    "<phone number to update>";

  // This will update the phone number to send and receive sms, but only send calls.
  const updateRequest = {
    sms: "inbound+outbound",
    calling: "outbound"
  };

  const updatePoller = await client.beginUpdatePhoneNumberCapabilities(
    phoneNumberToUpdate,
    updateRequest
  );

  // Update is underway.
  const { capabilities } = await updatePoller.pollUntilDone();
  console.log(`These are the update capabilities: ${capabilities}`);
}

main().catch((error) => {
  console.log("The sample encountered an error:", error);
  process.exit(1);
});
