// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets load balancer frontend IP configuration.
 *
 * @summary gets load balancer frontend IP configuration.
 * x-ms-original-file: 2025-05-01/LoadBalancerFrontendIPConfigurationGet.json
 */
async function loadBalancerFrontendIPConfigurationGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancerFrontendIPConfigurations.get("testrg", "lb", "frontend");
  console.log(result);
}

async function main(): Promise<void> {
  await loadBalancerFrontendIPConfigurationGet();
}

main().catch(console.error);
