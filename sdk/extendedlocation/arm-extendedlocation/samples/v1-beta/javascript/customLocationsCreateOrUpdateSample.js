// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CustomLocationsManagementClient } = require("@azure/arm-extendedlocation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a Custom Location in the specified Subscription and Resource Group
 *
 * @summary creates or updates a Custom Location in the specified Subscription and Resource Group
 * x-ms-original-file: 2021-08-31-preview/CustomLocationsCreate_Update.json
 */
async function createOrUpdateCustomLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-2222-3333-4444-555555555555";
  const client = new CustomLocationsManagementClient(credential, subscriptionId);
  const result = await client.customLocations.createOrUpdate(
    "testresourcegroup",
    "customLocation01",
    {
      identity: { type: "SystemAssigned" },
      location: "West US",
      authentication: { type: "KubeConfig", value: "<base64 KubeConfig>" },
      clusterExtensionIds: [
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kubernetes/connectedCluster/someCluster/Microsoft.KubernetesConfiguration/clusterExtensions/fooExtension",
      ],
      displayName: "customLocationLocation01",
      hostResourceId:
        "/subscriptions/11111111-2222-3333-4444-555555555555/resourceGroups/testresourcegroup/providers/Microsoft.ContainerService/managedClusters/cluster01",
      namespace: "namespace01",
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateCustomLocation();
}

main().catch(console.error);
