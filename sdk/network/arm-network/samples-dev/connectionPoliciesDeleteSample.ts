// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a ConnectionPolicy.
 *
 * @summary deletes a ConnectionPolicy.
 * x-ms-original-file: 2025-07-01/ConnectionPolicyDelete.json
 */
async function connectionPolicyDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.connectionPolicies.delete("rg1", "TestHub", "testpolicy");
}

async function main(): Promise<void> {
  await connectionPolicyDelete();
}

main().catch(console.error);
