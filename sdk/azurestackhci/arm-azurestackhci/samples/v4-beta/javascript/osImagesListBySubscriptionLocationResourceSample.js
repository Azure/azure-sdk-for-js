// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all os images.
 *
 * @summary list all os images.
 * x-ms-original-file: 2025-12-01-preview/OsImages_ListBySubscriptionLocationResource_MaximumSet_Gen.json
 */
async function osImagesListBySubscriptionLocationResourceMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b8d594e5-51f3-4c11-9c54-a7771b81c712";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.osImages.listBySubscriptionLocationResource("westus2")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await osImagesListBySubscriptionLocationResourceMaximumSet();
}

main().catch(console.error);
