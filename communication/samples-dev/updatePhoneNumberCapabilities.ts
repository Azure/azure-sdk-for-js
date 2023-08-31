// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Update the capabilities of a purchased phone number.
 */

import {
  PhoneNumbersClient,
  PhoneNumberCapabilitiesRequest,
} from "@azure/communication-phone-numbers";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log("\n== Update Phone Number Capabilities Sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new PhoneNumbersClient(connectionString);

  // You will need to set any of these environment variables or edit the following values
  const phoneNumberToUpdate =
    process.env.PHONE_NUMBER_TO_UPDATE ||
    process.env.AZURE_PHONE_NUMBER ||
    "<phone number to update>";

  // This will update the phone number to send and receive sms, but only send calls.
  const updateRequest: PhoneNumberCapabilitiesRequest = {
    sms: "inbound+outbound",
    calling: "outbound",
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
