// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets load balancer frontend IP configuration.
 *
 * @summary gets load balancer frontend IP configuration.
 * x-ms-original-file: 2025-05-01/LoadBalancerFrontendIPConfigurationGet.json
 */
async function loadBalancerFrontendIPConfigurationGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancerFrontendIPConfigurations.get("testrg", "lb", "frontend");
  console.log(result);
}

async function main() {
  await loadBalancerFrontendIPConfigurationGet();
}

main().catch(console.error);
