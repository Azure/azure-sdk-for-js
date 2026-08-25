// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a connection.
 *
 * @summary delete a connection.
 * x-ms-original-file: 2026-08-01-preview/Connections_Delete.json
 */
async function deleteAConnectionInAWorkspace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  await client.connections.delete("exampleRG", "exampleWorkspace", "aksClusterConnection");
}

async function main() {
  await deleteAConnectionInAWorkspace();
}

main().catch(console.error);
