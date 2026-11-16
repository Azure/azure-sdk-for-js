// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a connection.
 *
 * @summary create or update a connection.
 * x-ms-original-file: 2026-11-01/Connections_CreateOrUpdate.json
 */
async function createOrUpdateAConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.connections.createOrUpdate(
    "exampleRG",
    "exampleWorkspace",
    "aksClusterConnection",
    {
      properties: {
        kind: "AksExtension",
        targetResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/exampleRG/providers/Microsoft.ContainerService/managedClusters/exampleCluster",
        principalId: "00000000-0000-0000-0000-000000000000",
        tenantId: "00000000-0000-0000-0000-000000000000",
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAConnection();
}

main().catch(console.error);
