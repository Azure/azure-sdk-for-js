// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified custom IP prefix.
 *
 * @summary deletes the specified custom IP prefix.
 * x-ms-original-file: 2025-05-01/CustomIpPrefixDelete.json
 */
async function deleteCustomIPPrefix(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.customIPPrefixes.delete("rg1", "test-customipprefix");
}

async function main(): Promise<void> {
  await deleteCustomIPPrefix();
}

main().catch(console.error);
