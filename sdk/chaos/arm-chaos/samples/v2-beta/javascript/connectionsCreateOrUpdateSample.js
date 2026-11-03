// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a connection.
 *
 * @summary create or update a connection.
 * x-ms-original-file: 2026-08-01-preview/Connections_CreateOrUpdate.json
 */
async function createOrUpdateAConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.connections.createOrUpdate(
    "exampleRG",
    "exampleWorkspace",
    "aksClusterConnection",
    {
      properties: {
        kind: "AksExtension",
        targetResourceId:
          "/subscriptions/6b052e15-03d3-4f17-b2e1-be7f07588291/resourceGroups/exampleRG/providers/Microsoft.ContainerService/managedClusters/exampleCluster",
        principalId: "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
        tenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47",
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAConnection();
}

main().catch(console.error);
