// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a private endpoint connection.
 *
 * @summary deletes a private endpoint connection.
 * x-ms-original-file: 2025-04-01-preview/privatelink/WorkspaceDeletePrivateEndpointConnection.json
 */
async function workspacePrivateEndpointConnectionsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  await client.workspacePrivateEndpointConnections.delete("testRG", "workspace1", "myConnection");
}

async function main(): Promise<void> {
  await workspacePrivateEndpointConnectionsDelete();
}

main().catch(console.error);
