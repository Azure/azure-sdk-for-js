// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a private endpoint.
 *
 * @summary creates or updates a private endpoint.
 * x-ms-original-file: 2025-02-01-preview/CreateOrUpdateJobPrivateEndpoint.json
 */
async function createAPrivateEndpoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.jobPrivateEndpoints.createOrUpdate(
    "group1",
    "server1",
    "agent1",
    "endpoint1",
    {
      targetServerAzureResourceId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/group1/providers/Microsoft.Sql/servers/targetserver1",
    },
  );
  console.log(result);
}

async function main() {
  await createAPrivateEndpoint();
}

main().catch(console.error);
