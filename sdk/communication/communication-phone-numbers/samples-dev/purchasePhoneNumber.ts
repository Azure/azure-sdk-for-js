// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Search for a toll-free phone number then purchase it.
 */

import {
  PhoneNumbersClient,
  SearchAvailablePhoneNumbersRequest,
} from "@azure/communication-phone-numbers";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log("\n== Purchase Phone Number Sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new PhoneNumbersClient(connectionString);

  // create search request
  const searchRequest: SearchAvailablePhoneNumbersRequest = {
    countryCode: "US",
    phoneNumberType: "tollFree",
    assignmentType: "application",
    capabilities: {
      sms: "outbound",
      calling: "none",
    },
  };

  // get poller to monitor search
  const searchPoller = await client.beginSearchAvailablePhoneNumbers(searchRequest);

  console.log("Searching for available phone number for purchase.");

  // the search is underway so wait to receive the searchId to perform the purchase
  const searchResults = await searchPoller.pollUntilDone();

  if (searchResults.searchId && searchResults.phoneNumbers && searchResults.phoneNumbers.length) {
    const { searchId, phoneNumbers } = searchResults;

    console.log("Phone number reserved for purchase.");
    console.log(`Id: ${JSON.stringify(searchId)}`);

    // get poller to monitor purchase
    const purchasePoller = await client.beginPurchasePhoneNumbers(searchId);

    // Purchase is underway.
    await purchasePoller.pollUntilDone();
    console.log(`Successfully purchased ${phoneNumbers[0]}`);
  } else {
    console.log("Did not find any phone numbers.");
  }
}

main().catch((error) => {
  console.log("The sample encountered an error:", error);
  process.exit(1);
});
