// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to migrate load balancer to IP Based
 *
 * @summary migrate load balancer to IP Based
 * x-ms-original-file: 2025-05-01/MigrateLoadBalancerToIPBased.json
 */
async function migrateLoadBalancerToIPBased(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancers.migrateToIpBased("rg1", "lb1", {
    parameters: { pools: ["pool1", "pool2"] },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await migrateLoadBalancerToIPBased();
}

main().catch(console.error);
