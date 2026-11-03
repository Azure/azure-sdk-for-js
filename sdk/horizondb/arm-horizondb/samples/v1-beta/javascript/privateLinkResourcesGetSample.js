// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a private link resource.
 *
 * @summary gets a private link resource.
 * x-ms-original-file: 2026-10-01-preview/PrivateLinkResources_Get.json
 */
async function getAHorizonDBPrivateLinkResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get(
    "example-resource-group",
    "example-cluster",
    "example-cluster",
  );
  console.log(result);
}

async function main() {
  await getAHorizonDBPrivateLinkResource();
}

main().catch(console.error);
