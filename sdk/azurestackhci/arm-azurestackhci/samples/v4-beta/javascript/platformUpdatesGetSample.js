// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a platform update.
 *
 * @summary get a platform update.
 * x-ms-original-file: 2025-12-01-preview/PlatformUpdates_Get_MaximumSet_Gen.json
 */
async function platformUpdatesGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b8d594e5-51f3-4c11-9c54-a7771b81c712";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.platformUpdates.get("westus2", "10.2408.0.1");
  console.log(result);
}

async function main() {
  await platformUpdatesGetMaximumSet();
}

main().catch(console.error);
