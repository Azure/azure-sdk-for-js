// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDatabricksManagementClient } from "@azure/arm-databricks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the status of a private endpoint connection with the specified name
 *
 * @summary update the status of a private endpoint connection with the specified name
 * x-ms-original-file: 2026-01-01/PrivateEndpointConnectionsUpdate.json
 */
async function updateAPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.create(
    "myResourceGroup",
    "myWorkspace",
    "myWorkspace.23456789-1111-1111-1111-111111111111",
    {
      properties: {
        privateLinkServiceConnectionState: {
          description: "Approved by databricksadmin@contoso.com",
          status: "Approved",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAPrivateEndpointConnection();
}

main().catch(console.error);
