// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DigitalAssetsClient } = require("@azure/arm-digitalassets");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a ZkpRollup
 *
 * @summary get a ZkpRollup
 * x-ms-original-file: 2025-09-01-preview/ZkpRollups_Get.json
 */
async function getZkpRollup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DigitalAssetsClient(credential, subscriptionId);
  const result = await client.zkpRollups.get("testrg", "Jack");
  console.log(result);
}

async function main() {
  await getZkpRollup();
}

main().catch(console.error);
