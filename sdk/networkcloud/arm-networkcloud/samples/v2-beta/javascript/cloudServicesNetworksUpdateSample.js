// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update properties of the provided cloud services network, or update the tags associated with it. Properties and tag updates can be done independently.
 *
 * @summary update properties of the provided cloud services network, or update the tags associated with it. Properties and tag updates can be done independently.
 * x-ms-original-file: 2026-05-01-preview/CloudServicesNetworks_Patch.json
 */
async function patchCloudServicesNetwork() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.cloudServicesNetworks.update(
    "resourceGroupName",
    "cloudServicesNetworkName",
    {
      cloudServicesNetworkUpdateParameters: {
        additionalEgressEndpoints: [
          {
            category: "azure-resource-management",
            endpoints: [{ domainName: "storageaccountex.blob.core.windows.net", port: 443 }],
          },
        ],
        enableDefaultEgressEndpoints: "False",
        storageOptions: {
          mode: "Standard",
          sizeMiB: 1048576,
          storageApplianceId:
            "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.NetworkCloud/storageAppliances/storageApplianceName",
        },
        tags: { key1: "myvalue1", key2: "myvalue2" },
      },
    },
  );
  console.log(result);
}

async function main() {
  await patchCloudServicesNetwork();
}

main().catch(console.error);
