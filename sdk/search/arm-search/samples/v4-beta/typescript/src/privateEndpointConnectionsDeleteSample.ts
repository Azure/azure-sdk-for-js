// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SearchManagementClient } from "@azure/arm-search";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to disconnects the private endpoint connection and deletes it from the search service.
 * Returns 200 (OK) with the deleted connection details on successful deletion, or 404 (Not Found) if the connection does not exist.
 * NOTE: The behavior of returning 404 is inconsistent with ARM guidelines. Clients should expect a 204 response in future versions and avoid new dependencies on the 404 response.
 *
 * @summary disconnects the private endpoint connection and deletes it from the search service.
 * Returns 200 (OK) with the deleted connection details on successful deletion, or 404 (Not Found) if the connection does not exist.
 * NOTE: The behavior of returning 404 is inconsistent with ARM guidelines. Clients should expect a 204 response in future versions and avoid new dependencies on the 404 response.
 * x-ms-original-file: 2026-03-01-preview/DeletePrivateEndpointConnection.json
 */
async function privateEndpointConnectionDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.delete(
    "rg1",
    "mysearchservice",
    "testEndpoint.50bf4fbe-d7c1-4b48-a642-4f5892642546",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionDelete();
}

main().catch(console.error);
