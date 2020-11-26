// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PhoneNumberAdministrationClient } from "@azure/communication-administration";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

const connectionString =
  process.env["COMMUNICATION_CONNECTION_STRING"] || "<communication service connection string>";

export async function main(): Promise<void> {
  const client = new PhoneNumberAdministrationClient(connectionString);

  // Search for two phone numbers
  const searchPoller = await client.beginSearchAvailablePhoneNumbers("US", {
    numberType: "geographic",
    assignmentType: "application",
    capabilities: {
      sms: "outbound",
      calling: "inbound+outbound"
    },
    areaCode: "425"
  });

  const searchResult = await searchPoller.pollUntilDone();

  console.log(`SearchId: ${searchResult.id}`);
  console.log(`Found numbers: ${searchResult.phoneNumbers}`);
  console.log(`Expires by: ${searchResult.searchExpiresBy}`);
  console.log(
    `Monthly cost: ${searchResult.monthlyRate.currency} ${searchResult.monthlyRate.value}`
  );

  // Purchase phone numbers in a search result

  const purchasePoller = await client.beginPurchasePhoneNumbers(searchResult.id);
  const purchaseResult = await purchasePoller.pollUntilDone();

  console.log("Purchase succeeded");

  // Update an acquired phone number
  const updatePoller = await client.beginUpdatePhoneNumber("+1412555000", {
    applicationId: "1dcb5bde-f5f5-4195-a1c1-43f157688769",
    callbackUrl: "https://contoso.com/webhooks/phone",
    capabilities: {
      sms: "inbound+outbound"
    }
  });

  const updatedPhoneNumber = await updatePoller.pollUntilDone();
  console.log("New applicationId: ", updatedPhoneNumber.applicationId);
  console.log("New callbackUrl: ", updatedPhoneNumber.callbackUrl);
  console.log("New capabilities: ", updatedPhoneNumber.capabilities);

  // List all phone numbers we have
  for await (const phoneNumber of client.listPhoneNumbers()) {
    console.log("phone number: ", phoneNumber.phoneNumber);
    console.log("properties: ", phoneNumber);
  }

  // Release a phone number
  const releasePoller = await client.beginReleasePhoneNumber("+1412555000");
  const releaseResult = await releasePoller.pollUntilDone();

  console.log("Release succeeded");
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
