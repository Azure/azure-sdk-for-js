// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SearchManagementClient } = require("@azure/arm-search");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to disconnects the private endpoint connection and deletes it from the search service.
 *
 * @summary disconnects the private endpoint connection and deletes it from the search service.
 * x-ms-original-file: 2025-05-01/DeletePrivateEndpointConnection.json
 */
async function privateEndpointConnectionDelete() {
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

async function main() {
  await privateEndpointConnectionDelete();
}

main().catch(console.error);
