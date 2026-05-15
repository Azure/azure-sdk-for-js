// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to unprepares a subnet by removing network intent policies.
 *
 * @summary unprepares a subnet by removing network intent policies.
 * x-ms-original-file: 2025-05-01/SubnetUnprepareNetworkPolicies.json
 */
async function unprepareNetworkPolicies(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.subnets.unprepareNetworkPolicies("rg1", "test-vnet", "subnet1", {
    serviceName: "Microsoft.Sql/managedInstances",
  });
}

async function main(): Promise<void> {
  await unprepareNetworkPolicies();
}

main().catch(console.error);
