// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update the state of the specified private endpoint connection associated with the workspace.
 *
 * @summary Update the state of the specified private endpoint connection associated with the workspace.
 * x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2024-03-31/examples/privatelink/WorkspaceCreatePrivateEndpointConnection.json
 */

import type { PrivateEndpointConnectionDescription } from "@azure/arm-healthcareapis";
import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function workspacePrivateEndpointConnectionCreateOrUpdate(): Promise<void> {
  const subscriptionId = process.env["HEALTHCAREAPIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HEALTHCAREAPIS_RESOURCE_GROUP"] || "testRG";
  const workspaceName = "workspace1";
  const privateEndpointConnectionName = "myConnection";
  const properties: PrivateEndpointConnectionDescription = {
    privateLinkServiceConnectionState: {
      description: "Auto-Approved",
      status: "Approved",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.workspacePrivateEndpointConnections.beginCreateOrUpdateAndWait(
    resourceGroupName,
    workspaceName,
    privateEndpointConnectionName,
    properties,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await workspacePrivateEndpointConnectionCreateOrUpdate();
}

main().catch(console.error);
