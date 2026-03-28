// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified Private Endpoint Connection.
 *
 * @summary deletes the specified Private Endpoint Connection.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeletePrivateEndpointConnection.json
 */
async function apiManagementDeletePrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.privateEndpointConnection.delete(
    "rg1",
    "apimService1",
    "privateEndpointConnectionName",
  );
}

async function main(): Promise<void> {
  await apiManagementDeletePrivateEndpointConnection();
}

main().catch(console.error);
