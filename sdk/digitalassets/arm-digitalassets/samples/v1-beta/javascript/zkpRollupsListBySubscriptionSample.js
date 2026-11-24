// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DigitalAssetsClient } = require("@azure/arm-digitalassets");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list ZkpRollup resources by subscription ID
 *
 * @summary list ZkpRollup resources by subscription ID
 * x-ms-original-file: 2025-09-01-preview/ZkpRollups_ListBySubscription.json
 */
async function listZkpRollupsBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DigitalAssetsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.zkpRollups.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listZkpRollupsBySubscription();
}

main().catch(console.error);
