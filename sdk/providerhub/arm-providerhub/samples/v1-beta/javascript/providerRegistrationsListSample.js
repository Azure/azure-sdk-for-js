// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of the provider registrations in the subscription.
 *
 * @summary gets the list of the provider registrations in the subscription.
 * x-ms-original-file: 2024-09-01/ProviderRegistrations_List.json
 */
async function providerRegistrationsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.providerRegistrations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await providerRegistrationsList();
}

main().catch(console.error);
