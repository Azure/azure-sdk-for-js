// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a devicePool
 *
 * @summary update a devicePool
 * x-ms-original-file: 2026-03-01-preview/DevicePools_Update_MaximumSet_Gen.json
 */
async function devicePoolsUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.devicePools.update("ArcInstance-rg", "devicePool1", {
    tags: { key2335: "beth" },
  });
  console.log(result);
}

async function main() {
  await devicePoolsUpdateMaximumSet();
}

main().catch(console.error);
