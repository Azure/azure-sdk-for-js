// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get a MetricsObjectFirewallResource
 *
 * @summary Get a MetricsObjectFirewallResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/MetricsObjectFirewall_Get_MaximumSet_Gen.json
 */
async function metricsObjectFirewallGetMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] || "aaaaaaa";
  const resourceGroupName =
    process.env["PALOALTONETWORKSNGFW_RESOURCE_GROUP"] || "rgopenapi";
  const firewallName = "aaaaaaaaaaaaaaaaaaaaaaaa";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.metricsObjectFirewall.get(
    resourceGroupName,
    firewallName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Get a MetricsObjectFirewallResource
 *
 * @summary Get a MetricsObjectFirewallResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/MetricsObjectFirewall_Get_MinimumSet_Gen.json
 */
async function metricsObjectFirewallGetMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] || "aaaaaaa";
  const resourceGroupName =
    process.env["PALOALTONETWORKSNGFW_RESOURCE_GROUP"] || "rgopenapi";
  const firewallName = "aaaaaaaaaaaaaaaaaaaaaaaa";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.metricsObjectFirewall.get(
    resourceGroupName,
    firewallName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await metricsObjectFirewallGetMaximumSetGen();
  await metricsObjectFirewallGetMinimumSetGen();
}

main().catch(console.error);
