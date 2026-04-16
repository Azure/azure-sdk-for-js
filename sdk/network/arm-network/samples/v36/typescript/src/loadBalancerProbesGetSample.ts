// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets load balancer probe.
 *
 * @summary Gets load balancer probe.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/LoadBalancerProbeGet.json
 */
async function loadBalancerProbeGet(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "testrg";
  const loadBalancerName = "lb";
  const probeName = "probe1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancerProbes.get(
    resourceGroupName,
    loadBalancerName,
    probeName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await loadBalancerProbeGet();
}

main().catch(console.error);
