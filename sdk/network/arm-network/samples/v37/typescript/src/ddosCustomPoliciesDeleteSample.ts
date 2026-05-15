// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified DDoS custom policy.
 *
 * @summary deletes the specified DDoS custom policy.
 * x-ms-original-file: 2025-05-01/DdosCustomPolicyDelete.json
 */
async function deleteDDoSCustomPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.ddosCustomPolicies.delete("rg1", "test-ddos-custom-policy");
}

async function main(): Promise<void> {
  await deleteDDoSCustomPolicy();
}

main().catch(console.error);
