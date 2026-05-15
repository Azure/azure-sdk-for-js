// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to prepares a subnet by applying network intent policies.
 *
 * @summary prepares a subnet by applying network intent policies.
 * x-ms-original-file: 2025-05-01/SubnetPrepareNetworkPolicies.json
 */
async function prepareNetworkPolicies(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.subnets.prepareNetworkPolicies("rg1", "test-vnet", "subnet1", {
    serviceName: "Microsoft.Sql/managedInstances",
  });
}

async function main(): Promise<void> {
  await prepareNetworkPolicies();
}

main().catch(console.error);
