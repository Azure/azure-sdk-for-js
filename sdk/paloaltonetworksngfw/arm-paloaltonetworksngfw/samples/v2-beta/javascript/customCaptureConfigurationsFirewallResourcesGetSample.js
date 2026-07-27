// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the current Custom Capture Configuration for a firewall. Always returns 200 OK + body. Caller reads properties.pcapStatus to know whether to keep polling. Body field properties.nextCheckInSeconds advises when to poll next (omitted on terminal states).
 *
 * @summary get the current Custom Capture Configuration for a firewall. Always returns 200 OK + body. Caller reads properties.pcapStatus to know whether to keep polling. Body field properties.nextCheckInSeconds advises when to poll next (omitted on terminal states).
 * x-ms-original-file: 2026-05-11-preview/CustomCaptureConfigurationsFirewallResources_Get_MaximumSet_Gen.json
 */
async function customCaptureConfigurationsFirewallResourcesGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.customCaptureConfigurationsFirewallResources.get(
    "firewall-rg",
    "firewall1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get the current Custom Capture Configuration for a firewall. Always returns 200 OK + body. Caller reads properties.pcapStatus to know whether to keep polling. Body field properties.nextCheckInSeconds advises when to poll next (omitted on terminal states).
 *
 * @summary get the current Custom Capture Configuration for a firewall. Always returns 200 OK + body. Caller reads properties.pcapStatus to know whether to keep polling. Body field properties.nextCheckInSeconds advises when to poll next (omitted on terminal states).
 * x-ms-original-file: 2026-05-11-preview/CustomCaptureConfigurationsFirewallResources_Get_MinimumSet_Gen.json
 */
async function customCaptureConfigurationsFirewallResourcesGetMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.customCaptureConfigurationsFirewallResources.get(
    "firewall-rg",
    "firewall1",
  );
  console.log(result);
}

async function main() {
  await customCaptureConfigurationsFirewallResourcesGetMaximumSetGen();
  await customCaptureConfigurationsFirewallResourcesGetMinimumSetGen();
}

main().catch(console.error);
