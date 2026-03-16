// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes Policy
 *
 * @summary deletes Policy
 * x-ms-original-file: 2025-10-01/WafPolicyDelete.json
 */
async function deleteProtectionPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  await client.policies.delete("rg1", "Policy1");
}

async function main(): Promise<void> {
  await deleteProtectionPolicy();
}

main().catch(console.error);
