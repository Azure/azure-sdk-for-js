// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets load balancer probe.
 *
 * @summary gets load balancer probe.
 * x-ms-original-file: 2025-05-01/LoadBalancerProbeGet.json
 */
async function loadBalancerProbeGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancerProbes.get("testrg", "lb", "probe1");
  console.log(result);
}

async function main() {
  await loadBalancerProbeGet();
}

main().catch(console.error);
