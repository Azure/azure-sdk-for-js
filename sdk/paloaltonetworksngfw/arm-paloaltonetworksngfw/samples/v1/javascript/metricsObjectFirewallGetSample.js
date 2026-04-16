// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get a MetricsObjectFirewallResource
 *
 * @summary Get a MetricsObjectFirewallResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/MetricsObjectFirewall_Get_MaximumSet_Gen.json
 */
async function metricsObjectFirewallGetMaximumSetGen() {
  const subscriptionId = process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] || "aaaaaaa";
  const resourceGroupName = process.env["PALOALTONETWORKSNGFW_RESOURCE_GROUP"] || "rgopenapi";
  const firewallName = "aaaaaaaaaaaaaaaaaaaaaaaa";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.metricsObjectFirewall.get(resourceGroupName, firewallName);
  console.log(result);
}

/**
 * This sample demonstrates how to Get a MetricsObjectFirewallResource
 *
 * @summary Get a MetricsObjectFirewallResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/MetricsObjectFirewall_Get_MinimumSet_Gen.json
 */
async function metricsObjectFirewallGetMinimumSetGen() {
  const subscriptionId = process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] || "aaaaaaa";
  const resourceGroupName = process.env["PALOALTONETWORKSNGFW_RESOURCE_GROUP"] || "rgopenapi";
  const firewallName = "aaaaaaaaaaaaaaaaaaaaaaaa";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.metricsObjectFirewall.get(resourceGroupName, firewallName);
  console.log(result);
}

async function main() {
  await metricsObjectFirewallGetMaximumSetGen();
  await metricsObjectFirewallGetMinimumSetGen();
}

main().catch(console.error);
