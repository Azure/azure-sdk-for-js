// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a ResourceGuard belonging to a resource group.
 *
 * @summary returns a ResourceGuard belonging to a resource group.
 * x-ms-original-file: 2025-07-01/ResourceGuardCRUD/GetResourceGuard.json
 */
async function getResourceGuard() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.resourceGuards.get("SampleResourceGroup", "swaggerExample");
  console.log(result);
}

async function main() {
  await getResourceGuard();
}

main().catch(console.error);
