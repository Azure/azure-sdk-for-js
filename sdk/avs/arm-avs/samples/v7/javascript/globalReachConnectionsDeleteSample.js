// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a GlobalReachConnection
 *
 * @summary delete a GlobalReachConnection
 * x-ms-original-file: 2025-09-01/GlobalReachConnections_Delete.json
 */
async function globalReachConnectionsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.globalReachConnections.delete("group1", "cloud1", "connection1");
}

async function main() {
  await globalReachConnectionsDelete();
}

main().catch(console.error);
