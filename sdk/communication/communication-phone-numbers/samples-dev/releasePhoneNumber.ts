// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to us the PhoneNumbersClient to release phone numbers.
 */

import { PhoneNumbersClient } from "@azure/communication-phone-numbers";

export const main = async () => {
  console.log("\n== Release Phone Numbers Typescript Sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  try {
    // create new client
    const client = new PhoneNumbersClient(connectionString);

    const phoneNumberToRelease = "+16135550147";

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
