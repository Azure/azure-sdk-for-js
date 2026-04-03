// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SearchManagementClient } = require("@azure/arm-search");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a private endpoint connection to the search service in the given resource group.
 *
 * @summary updates a private endpoint connection to the search service in the given resource group.
 * x-ms-original-file: 2026-03-01-preview/UpdatePrivateEndpointConnection.json
 */
async function privateEndpointConnectionUpdate() {
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
          status: "Rejected",
          description:
            "Connection is rejected due to lack of authorization or failure to meet security compliance requirements.",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await privateEndpointConnectionUpdate();
}

main().catch(console.error);
