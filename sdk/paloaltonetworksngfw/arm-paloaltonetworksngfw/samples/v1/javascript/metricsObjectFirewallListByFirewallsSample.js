// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to List MetricsObjectFirewallResource resources by Firewalls
 *
 * @summary List MetricsObjectFirewallResource resources by Firewalls
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/MetricsObjectFirewall_ListByFirewalls_MaximumSet_Gen.json
 */
async function metricsObjectFirewallListByFirewallsMaximumSetGen() {
  const subscriptionId =
    process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] || "aaaaaaaaaaaaaaaaaaaaaaaaa";
  const resourceGroupName = process.env["PALOALTONETWORKSNGFW_RESOURCE_GROUP"] || "rgopenapi";
  const firewallName = "IFTDk";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.metricsObjectFirewall.listByFirewalls(
    resourceGroupName,
    firewallName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to List MetricsObjectFirewallResource resources by Firewalls
 *
 * @summary List MetricsObjectFirewallResource resources by Firewalls
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/MetricsObjectFirewall_ListByFirewalls_MinimumSet_Gen.json
 */
async function metricsObjectFirewallListByFirewallsMinimumSetGen() {
  const subscriptionId =
    process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] || "aaaaaaaaaaaaaaaaaaaaaaaaa";
  const resourceGroupName = process.env["PALOALTONETWORKSNGFW_RESOURCE_GROUP"] || "rgopenapi";
  const firewallName = "IFTDk";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.metricsObjectFirewall.listByFirewalls(
    resourceGroupName,
    firewallName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await metricsObjectFirewallListByFirewallsMaximumSetGen();
  await metricsObjectFirewallListByFirewallsMinimumSetGen();
}

main().catch(console.error);
