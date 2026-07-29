// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the state of the specified private endpoint connection associated with the workspace.
 *
 * @summary update the state of the specified private endpoint connection associated with the workspace.
 * x-ms-original-file: 2025-04-01-preview/privatelink/WorkspaceCreatePrivateEndpointConnection.json
 */
async function workspacePrivateEndpointConnectionCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.workspacePrivateEndpointConnections.createOrUpdate(
    "testRG",
    "workspace1",
    "myConnection",
    { privateLinkServiceConnectionState: { description: "Auto-Approved", status: "Approved" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await workspacePrivateEndpointConnectionCreateOrUpdate();
}

main().catch(console.error);
