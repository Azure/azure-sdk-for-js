// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified load balancer backend address pool.
 *
 * @summary deletes the specified load balancer backend address pool.
 * x-ms-original-file: 2025-05-01/LoadBalancerBackendAddressPoolDelete.json
 */
async function backendAddressPoolDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.loadBalancerBackendAddressPools.delete("testrg", "lb", "backend");
}

async function main(): Promise<void> {
  await backendAddressPoolDelete();
}

main().catch(console.error);
