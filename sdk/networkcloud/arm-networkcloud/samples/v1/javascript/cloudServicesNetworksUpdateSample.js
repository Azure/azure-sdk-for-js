// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Update properties of the provided cloud services network, or update the tags associated with it. Properties and tag updates can be done independently.
 *
 * @summary Update properties of the provided cloud services network, or update the tags associated with it. Properties and tag updates can be done independently.
 * x-ms-original-file: specification/networkcloud/resource-manager/Microsoft.NetworkCloud/stable/2025-09-01/examples/CloudServicesNetworks_Patch.json
 */
async function patchCloudServicesNetwork() {
  const subscriptionId =
    process.env["NETWORKCLOUD_SUBSCRIPTION_ID"] || "123e4567-e89b-12d3-a456-426655440000";
  const resourceGroupName = process.env["NETWORKCLOUD_RESOURCE_GROUP"] || "resourceGroupName";
  const cloudServicesNetworkName = "cloudServicesNetworkName";
  const cloudServicesNetworkUpdateParameters = {
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
        "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.NetworkCloud/StorageAppliances/storageApplianceName",
    },
    tags: { key1: "myvalue1", key2: "myvalue2" },
  };
  const options = {
    cloudServicesNetworkUpdateParameters,
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.cloudServicesNetworks.beginUpdateAndWait(
    resourceGroupName,
    cloudServicesNetworkName,
    options,
  );
  console.log(result);
}

async function main() {
  await patchCloudServicesNetwork();
}

main().catch(console.error);
