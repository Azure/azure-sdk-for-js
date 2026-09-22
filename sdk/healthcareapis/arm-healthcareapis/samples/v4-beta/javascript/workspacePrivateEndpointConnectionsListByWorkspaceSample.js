// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all private endpoint connections for a workspace.
 *
 * @summary lists all private endpoint connections for a workspace.
 * x-ms-original-file: 2025-04-01-preview/privatelink/WorkspaceListPrivateEndpointConnections.json
 */
async function workspacePrivateEndpointConnectionList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspacePrivateEndpointConnections.listByWorkspace(
    "testRG",
    "workspace1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await workspacePrivateEndpointConnectionList();
}

main().catch(console.error);
