// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified private endpoint connection associated with the workspace.
 *
 * @summary gets the specified private endpoint connection associated with the workspace.
 * x-ms-original-file: 2025-04-01-preview/privatelink/WorkspaceGetPrivateEndpointConnection.json
 */
async function workspacePrivateEndpointConnectionGetConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.workspacePrivateEndpointConnections.get(
    "testRG",
    "workspace1",
    "myConnection",
  );
  console.log(result);
}

async function main() {
  await workspacePrivateEndpointConnectionGetConnection();
}

main().catch(console.error);
