// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Delete a MetricsObjectFirewallResource
 *
 * @summary Delete a MetricsObjectFirewallResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/MetricsObjectFirewall_Delete_MaximumSet_Gen.json
 */
async function metricsObjectFirewallDeleteMaximumSetGen() {
  const subscriptionId = process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] || "aaaaaaa";
  const resourceGroupName = process.env["PALOALTONETWORKSNGFW_RESOURCE_GROUP"] || "rgopenapi";
  const firewallName = "aaaaaaaaaaaaaaaaaaaaaaaa";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.metricsObjectFirewall.beginDeleteAndWait(
    resourceGroupName,
    firewallName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Delete a MetricsObjectFirewallResource
 *
 * @summary Delete a MetricsObjectFirewallResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/MetricsObjectFirewall_Delete_MinimumSet_Gen.json
 */
async function metricsObjectFirewallDeleteMinimumSetGen() {
  const subscriptionId = process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] || "aaaaaaa";
  const resourceGroupName = process.env["PALOALTONETWORKSNGFW_RESOURCE_GROUP"] || "rgopenapi";
  const firewallName = "aaaaaaaaaaaaaaaaaaaaaaaa";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.metricsObjectFirewall.beginDeleteAndWait(
    resourceGroupName,
    firewallName,
  );
  console.log(result);
}

async function main() {
  await metricsObjectFirewallDeleteMaximumSetGen();
  await metricsObjectFirewallDeleteMinimumSetGen();
}

main().catch(console.error);
