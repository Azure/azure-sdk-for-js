// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to start a Custom Capture Configuration on a firewall. SYNC — returns 200 OK + body immediately. Body's properties.pcapStatus reflects current state (typically InProgress). Caller polls GET on its own clock using properties.nextCheckInSeconds as the cadence hint.
 *
 * @summary start a Custom Capture Configuration on a firewall. SYNC — returns 200 OK + body immediately. Body's properties.pcapStatus reflects current state (typically InProgress). Caller polls GET on its own clock using properties.nextCheckInSeconds as the cadence hint.
 * x-ms-original-file: 2026-05-11-preview/CustomCaptureConfigurationsFirewallResources_CreateOrUpdate_MaximumSet_Gen.json
 */
async function customCaptureConfigurationsFirewallResourcesCreateOrUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.customCaptureConfigurationsFirewallResources.createOrUpdate(
    "firewall-rg",
    "firewall1",
    {
      properties: {
        pcapFilter: [
          {
            protocol: "TCP",
            sourceIpAddress: "10.0.0.5",
            sourcePort: 54321,
            destinationIpAddress: "52.39.204.87",
            destinationPort: 443,
          },
        ],
        pcapStages: ["Receive", "Transmit", "Drop"],
        durationInSec: 120,
        storageAccountResourceId:
          "/subscriptions/2bf4a339-294d-4c25-b0b2-ef649e9f5c27/resourceGroups/firewall-rg/providers/Microsoft.Storage/storageAccounts/pcapstorage",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to start a Custom Capture Configuration on a firewall. SYNC — returns 200 OK + body immediately. Body's properties.pcapStatus reflects current state (typically InProgress). Caller polls GET on its own clock using properties.nextCheckInSeconds as the cadence hint.
 *
 * @summary start a Custom Capture Configuration on a firewall. SYNC — returns 200 OK + body immediately. Body's properties.pcapStatus reflects current state (typically InProgress). Caller polls GET on its own clock using properties.nextCheckInSeconds as the cadence hint.
 * x-ms-original-file: 2026-05-11-preview/CustomCaptureConfigurationsFirewallResources_CreateOrUpdate_MinimumSet_Gen.json
 */
async function customCaptureConfigurationsFirewallResourcesCreateOrUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.customCaptureConfigurationsFirewallResources.createOrUpdate(
    "firewall-rg",
    "firewall1",
    {
      properties: {
        pcapFilter: [
          {
            protocol: "TCP",
            sourceIpAddress: "10.0.0.5",
            destinationIpAddress: "52.39.204.87",
            destinationPort: 443,
          },
        ],
        pcapStages: ["Firewall"],
        durationInSec: 30,
        storageAccountResourceId:
          "/subscriptions/2bf4a339-294d-4c25-b0b2-ef649e9f5c27/resourceGroups/firewall-rg/providers/Microsoft.Storage/storageAccounts/pcapstorage",
      },
    },
  );
  console.log(result);
}

async function main() {
  await customCaptureConfigurationsFirewallResourcesCreateOrUpdateMaximumSetGen();
  await customCaptureConfigurationsFirewallResourcesCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
