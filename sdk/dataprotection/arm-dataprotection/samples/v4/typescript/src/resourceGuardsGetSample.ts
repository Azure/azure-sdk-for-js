// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns a ResourceGuard belonging to a resource group.
 *
 * @summary returns a ResourceGuard belonging to a resource group.
 * x-ms-original-file: 2025-07-01/ResourceGuardCRUD/GetResourceGuard.json
 */
async function getResourceGuard(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.resourceGuards.get(
    "SampleResourceGroup",
    "swaggerExample",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getResourceGuard();
}

main().catch(console.error);
