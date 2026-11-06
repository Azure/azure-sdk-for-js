// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkSecurityManagementClient } from "@azure/arm-networksecurity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a protected resource under a NeuroShield resource.
 *
 * @summary gets a protected resource under a NeuroShield resource.
 * x-ms-original-file: 2026-10-01-preview/NeuroShieldProtectedResources_Get.json
 */
async function getProtectedResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  const result = await client.neuroShieldProtectedResources.get(
    "myResourceGroup",
    "myNeuroShield",
    "vm-01",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getProtectedResource();
}

main().catch(console.error);
