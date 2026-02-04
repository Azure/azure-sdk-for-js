// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to to learn more about private clusters, see: https://docs.microsoft.com/azure/aks/private-clusters
 *
 * @summary to learn more about private clusters, see: https://docs.microsoft.com/azure/aks/private-clusters
 * x-ms-original-file: 2025-10-02-preview/PrivateEndpointConnectionsGet.json
 */
async function getPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "rg1",
    "clustername1",
    "privateendpointconnection1",
  );
  console.log(result);
}

async function main() {
  await getPrivateEndpointConnection();
}

main().catch(console.error);
