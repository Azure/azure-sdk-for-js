// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list of inbound NAT rule port mappings.
 *
 * @summary list of inbound NAT rule port mappings.
 * x-ms-original-file: 2025-05-01/QueryInboundNatRulePortMapping.json
 */
async function queryInboundNATRulePortMapping() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancers.listInboundNatRulePortMappings("rg1", "lb1", "bp1", {
    ipAddress: "10.0.0.4",
  });
  console.log(result);
}

async function main() {
  await queryInboundNATRulePortMapping();
}

main().catch(console.error);
