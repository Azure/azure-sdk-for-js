// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a private link resource.
 *
 * @summary gets a private link resource.
 * x-ms-original-file: 2026-01-20-preview/PrivateLinkResources_Get.json
 */
async function getsAPrivateLinkResourceForHorizonDb() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.horizonDbPrivateLinkResources.get(
    "exampleresourcegroup",
    "examplecluster",
    "default",
  );
  console.log(result);
}

async function main() {
  await getsAPrivateLinkResourceForHorizonDb();
}

main().catch(console.error);
