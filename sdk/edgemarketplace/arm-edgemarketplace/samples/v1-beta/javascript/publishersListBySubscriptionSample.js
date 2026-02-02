// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeMarketplaceClient } = require("@azure/arm-edgemarketplace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Publisher resources by subscription ID
 *
 * @summary list Publisher resources by subscription ID
 * x-ms-original-file: 2025-10-01-preview/ListPublishersBySubscription.json
 */
async function publishersListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4bed37fd-19a1-4d31-8b44-40267555bec5";
  const client = new EdgeMarketplaceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.publishers.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await publishersListBySubscription();
}

main().catch(console.error);
