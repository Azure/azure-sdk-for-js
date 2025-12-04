// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates a pair of virtual endpoints for a server.
 *
 * @summary Creates a pair of virtual endpoints for a server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/VirtualEndpointCreate.json
 */
async function createAPairOfVirtualEndpointsForAServer() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const virtualEndpointName = "examplebasename";
  const parameters = {
    endpointType: "ReadWrite",
    members: ["exampleprimaryserver"],
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.virtualEndpoints.beginCreateAndWait(
    resourceGroupName,
    serverName,
    virtualEndpointName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createAPairOfVirtualEndpointsForAServer();
}

main().catch(console.error);
