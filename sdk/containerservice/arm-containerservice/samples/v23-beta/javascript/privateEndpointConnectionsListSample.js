// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to To learn more about private clusters, see: https://docs.microsoft.com/azure/aks/private-clusters
 *
 * @summary To learn more about private clusters, see: https://docs.microsoft.com/azure/aks/private-clusters
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-07-02-preview/examples/PrivateEndpointConnectionsList.json
 */
async function listPrivateEndpointConnectionsByManagedCluster() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.list(resourceGroupName, resourceName);
  console.log(result);
}

async function main() {
  await listPrivateEndpointConnectionsByManagedCluster();
}

main().catch(console.error);
