// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DigitalAssetsClient } = require("@azure/arm-digitalassets");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list ZkpRollup resources by resource group
 *
 * @summary list ZkpRollup resources by resource group
 * x-ms-original-file: 2025-09-01-preview/ZkpRollups_ListByResourceGroup.json
 */
async function listZkpRollupsByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DigitalAssetsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.zkpRollups.listByResourceGroup("testrg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listZkpRollupsByResourceGroup();
}

main().catch(console.error);
