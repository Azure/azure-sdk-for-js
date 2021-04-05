// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Update the capabilities of a purchased phone number.
 */

import {
  PhoneNumbersClient,
  PhoneNumberCapabilitiesRequest
} from "@azure/communication-phone-numbers";

export const main = async () => {
  console.log("\n== Update Phone Number Capabilities Typescript Sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  try {
    // create new client
    const client = new PhoneNumbersClient(connectionString);

    // You will need to set this environment variable or edit the following values
    const phoneNumberToUpdate = process.env.PHONE_NUMBER_TO_UPDATE || "";

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
  } catch (error) {
    console.log("The sample encountered an error:");
    console.error(error);
  }
};

main();
