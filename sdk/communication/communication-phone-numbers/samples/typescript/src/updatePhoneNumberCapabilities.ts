// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to us the PhoneNumbersClient to update
 * the capabilities of a purchased phone number.
 */

import {
  PhoneNumbersClient,
  PhoneNumberCapabilitiesRequest
} from "@azure/communication-phone-numbers";

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

// You will need to set this environment variable or edit the following values
const connectionString =
  process.env["COMMUNICATION_CONNECTION_STRING"] || "<communication service connection string>";

export const main = async () => {
  console.log("\n== Update Phone Number Capabilities Typescript Sample ==\n");

  // create new client
  const client = new PhoneNumbersClient(connectionString);

  const phoneNumberToUpdate = "<phone-number-to-update>";

  // This will update the phone number to send and receive sms, but only send calls.
  const updateRequest: PhoneNumberCapabilitiesRequest = {
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
};

main().catch((error) => {
  console.error("Encountered an error while updating the phone number: ");
  console.error("Request: \n", error.request);
  console.error("\nResponse: \n", error.response);
  console.error(error);
});
