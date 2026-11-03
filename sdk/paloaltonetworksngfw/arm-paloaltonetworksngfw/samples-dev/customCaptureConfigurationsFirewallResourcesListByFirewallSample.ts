// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Custom Capture Configurations under a firewall. The resource is a singleton (name is fixed to 'default'), so the response contains at most one entry.
 *
 * @summary list Custom Capture Configurations under a firewall. The resource is a singleton (name is fixed to 'default'), so the response contains at most one entry.
 * x-ms-original-file: 2026-05-11-preview/CustomCaptureConfigurationsFirewallResources_ListByFirewall_MaximumSet_Gen.json
 */
async function customCaptureConfigurationsFirewallResourcesListByFirewallMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.customCaptureConfigurationsFirewallResources.listByFirewall(
    "firewall-rg",
    "firewall1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list Custom Capture Configurations under a firewall. The resource is a singleton (name is fixed to 'default'), so the response contains at most one entry.
 *
 * @summary list Custom Capture Configurations under a firewall. The resource is a singleton (name is fixed to 'default'), so the response contains at most one entry.
 * x-ms-original-file: 2026-05-11-preview/CustomCaptureConfigurationsFirewallResources_ListByFirewall_MinimumSet_Gen.json
 */
async function customCaptureConfigurationsFirewallResourcesListByFirewallMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.customCaptureConfigurationsFirewallResources.listByFirewall(
    "firewall-rg",
    "firewall1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await customCaptureConfigurationsFirewallResourcesListByFirewallMaximumSetGen();
  await customCaptureConfigurationsFirewallResourcesListByFirewallMinimumSetGen();
}

main().catch(console.error);
