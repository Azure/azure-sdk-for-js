// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a GlobalReachConnection
 *
 * @summary get a GlobalReachConnection
 * x-ms-original-file: 2024-09-01/GlobalReachConnections_Get.json
 */
async function globalReachConnectionsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.globalReachConnections.get("group1", "cloud1", "connection1");
  console.log(result);
}

async function main() {
  await globalReachConnectionsGet();
}

main().catch(console.error);
