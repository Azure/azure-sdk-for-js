// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all the load balancer probes.
 *
 * @summary gets all the load balancer probes.
 * x-ms-original-file: 2025-05-01/LoadBalancerProbeList.json
 */
async function loadBalancerProbeList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.loadBalancerProbes.list("testrg", "lb")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await loadBalancerProbeList();
}

main().catch(console.error);
