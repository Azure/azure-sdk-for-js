// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about the specified DDoS custom policy.
 *
 * @summary gets information about the specified DDoS custom policy.
 * x-ms-original-file: 2025-05-01/DdosCustomPolicyGet.json
 */
async function getDDoSCustomPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.ddosCustomPolicies.get("rg1", "test-ddos-custom-policy");
  console.log(result);
}

async function main(): Promise<void> {
  await getDDoSCustomPolicy();
}

main().catch(console.error);
