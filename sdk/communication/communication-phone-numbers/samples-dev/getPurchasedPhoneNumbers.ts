// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to us the PhoneNumbersClient to list all purchased phone numbers.
 */

import { PhoneNumbersClient } from "@azure/communication-phone-numbers";

export const main = async () => {
  console.log("\n== Get a Purchased Phone Numbers Typescript Sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  try {
    // create new client
    const client = new PhoneNumbersClient(connectionString);

    const phoneNumbers = await client.listPurchasedPhoneNumbers();

    for await (const phoneNumber of phoneNumbers) {
      console.log(`The id is the same as the phone number: ${phoneNumber.id}`);
      console.log(`Phone number type is ${phoneNumber.phoneNumberType}`);
    }
  } catch (error) {
    console.log("The sample encountered an error:");
    console.error(error);
  }
};

main();
