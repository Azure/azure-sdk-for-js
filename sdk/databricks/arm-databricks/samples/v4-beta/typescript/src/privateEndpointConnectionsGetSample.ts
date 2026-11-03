// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDatabricksManagementClient } from "@azure/arm-databricks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a private endpoint connection properties for a workspace
 *
 * @summary get a private endpoint connection properties for a workspace
 * x-ms-original-file: 2026-01-01/PrivateEndpointConnectionsGet.json
 */
async function getAPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "myResourceGroup",
    "myWorkspace",
    "myWorkspace.23456789-1111-1111-1111-111111111111",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAPrivateEndpointConnection();
}

main().catch(console.error);
