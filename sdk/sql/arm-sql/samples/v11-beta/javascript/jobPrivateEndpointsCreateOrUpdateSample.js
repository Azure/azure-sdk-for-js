// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a private endpoint.
 *
 * @summary Creates or updates a private endpoint.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-05-01-preview/examples/CreateOrUpdateJobPrivateEndpoint.json
 */
async function createAPrivateEndpoint() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "group1";
  const serverName = "server1";
  const jobAgentName = "agent1";
  const privateEndpointName = "endpoint1";
  const parameters = {
    targetServerAzureResourceId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/group1/providers/Microsoft.Sql/servers/targetserver1",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.jobPrivateEndpoints.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    jobAgentName,
    privateEndpointName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createAPrivateEndpoint();
}

main().catch(console.error);
