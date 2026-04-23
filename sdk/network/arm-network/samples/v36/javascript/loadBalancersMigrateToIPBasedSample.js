// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Migrate load balancer to IP Based
 *
 * @summary Migrate load balancer to IP Based
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/MigrateLoadBalancerToIPBased.json
 */
async function migrateLoadBalancerToIPBased() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const groupName = "rg1";
  const loadBalancerName = "lb1";
  const parameters = {
    pools: ["pool1", "pool2"],
  };
  const options = { parameters };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancers.migrateToIpBased(groupName, loadBalancerName, options);
  console.log(result);
}

async function main() {
  await migrateLoadBalancerToIPBased();
}

main().catch(console.error);
