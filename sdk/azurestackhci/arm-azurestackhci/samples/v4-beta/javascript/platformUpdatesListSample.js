// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all platform updates.
 *
 * @summary list all platform updates.
 * x-ms-original-file: 2025-12-01-preview/PlatformUpdates_ListByLocation_MaximumSet_Gen.json
 */
async function platformUpdatesListByLocationMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b8d594e5-51f3-4c11-9c54-a7771b81c712";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.platformUpdates.list("westus2")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await platformUpdatesListByLocationMaximumSet();
}

main().catch(console.error);
