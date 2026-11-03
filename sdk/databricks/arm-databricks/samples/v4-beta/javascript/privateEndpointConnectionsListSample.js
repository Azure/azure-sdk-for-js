// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDatabricksManagementClient } = require("@azure/arm-databricks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list private endpoint connections of the workspace
 *
 * @summary list private endpoint connections of the workspace
 * x-ms-original-file: 2026-01-01/ListPrivateEndpointConnections.json
 */
async function listPrivateEndpointConnections() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.list(
    "myResourceGroup",
    "myWorkspace",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPrivateEndpointConnections();
}

main().catch(console.error);
