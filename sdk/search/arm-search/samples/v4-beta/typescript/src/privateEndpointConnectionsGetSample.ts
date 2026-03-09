// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SearchManagementClient } from "@azure/arm-search";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the details of the private endpoint connection to the search service in the given resource group.
 *
 * @summary gets the details of the private endpoint connection to the search service in the given resource group.
 * x-ms-original-file: 2025-05-01/GetPrivateEndpointConnection.json
 */
async function privateEndpointConnectionGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "rg1",
    "mysearchservice",
    "testEndpoint.50bf4fbe-d7c1-4b48-a642-4f5892642546",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionGet();
}

main().catch(console.error);
