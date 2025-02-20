// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceNetworkingManagementClient } from "@azure/arm-servicenetworking";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a SecurityPolicy
 *
 * @summary delete a SecurityPolicy
 * x-ms-original-file: 2025-01-01/SecurityPolicyDelete.json
 */
async function deleteSecurityPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  await client.securityPoliciesInterface.delete("rg1", "tc1", "sp1");
}

async function main(): Promise<void> {
  await deleteSecurityPolicy();
}

main().catch(console.error);
