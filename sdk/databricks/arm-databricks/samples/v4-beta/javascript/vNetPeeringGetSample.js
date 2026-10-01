// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDatabricksManagementClient } = require("@azure/arm-databricks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the workspace vNet Peering.
 *
 * @summary gets the workspace vNet Peering.
 * x-ms-original-file: 2026-01-01/WorkspaceVirtualNetPeeringGet.json
 */
async function getAWorkspaceWithVNetPeeringConfigured() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0140911e-1040-48da-8bc9-b99fb3dd88a6/";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.vNetPeering.get("subramantest", "adbworkspace", "vNetPeeringTest");
  console.log(result);
}

async function main() {
  await getAWorkspaceWithVNetPeeringConfigured();
}

main().catch(console.error);
