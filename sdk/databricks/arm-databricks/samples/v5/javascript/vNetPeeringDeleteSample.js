// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDatabricksManagementClient } = require("@azure/arm-databricks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the workspace vNetPeering.
 *
 * @summary deletes the workspace vNetPeering.
 * x-ms-original-file: 2026-01-01/WorkspaceVirtualNetworkPeeringDelete.json
 */
async function deleteAWorkspaceVNetPeering() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0140911e-1040-48da-8bc9-b99fb3dd88a6/";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  await client.vNetPeering.delete("subramantest", "adbworkspace", "vNetPeeringTest");
}

async function main() {
  await deleteAWorkspaceVNetPeering();
}

main().catch(console.error);
