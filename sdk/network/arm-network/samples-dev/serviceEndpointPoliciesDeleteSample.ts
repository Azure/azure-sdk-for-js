// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified service endpoint policy.
 *
 * @summary deletes the specified service endpoint policy.
 * x-ms-original-file: 2025-05-01/ServiceEndpointPolicyDelete.json
 */
async function deleteServiceEndpointPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.serviceEndpointPolicies.delete("rg1", "serviceEndpointPolicy1");
}

async function main(): Promise<void> {
  await deleteServiceEndpointPolicy();
}

main().catch(console.error);
