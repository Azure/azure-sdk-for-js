// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of skus for the given resource type.
 *
 * @summary gets the list of skus for the given resource type.
 * x-ms-original-file: 2024-09-01/Skus_ListByResourceTypeRegistrations.json
 */
async function skusListByResourceTypeRegistrations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.skus.listByResourceTypeRegistrations(
    "Microsoft.Contoso",
    "testResourceType",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await skusListByResourceTypeRegistrations();
}

main().catch(console.error);
