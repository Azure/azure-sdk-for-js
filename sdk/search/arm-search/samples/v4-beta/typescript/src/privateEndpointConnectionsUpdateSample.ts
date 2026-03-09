// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SearchManagementClient } from "@azure/arm-search";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a private endpoint connection to the search service in the given resource group.
 *
 * @summary updates a private endpoint connection to the search service in the given resource group.
 * x-ms-original-file: 2025-05-01/UpdatePrivateEndpointConnection.json
 */
async function privateEndpointConnectionUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.update(
    "rg1",
    "mysearchservice",
    "testEndpoint.50bf4fbe-d7c1-4b48-a642-4f5892642546",
    {
      properties: {
        privateLinkServiceConnectionState: {
          description: "Rejected for some reason.",
          status: "Rejected",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionUpdate();
}

main().catch(console.error);
