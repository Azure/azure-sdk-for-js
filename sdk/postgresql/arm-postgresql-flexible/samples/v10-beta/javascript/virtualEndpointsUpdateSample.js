// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a pair of virtual endpoints for a server.
 *
 * @summary updates a pair of virtual endpoints for a server.
 * x-ms-original-file: 2026-01-01-preview/VirtualEndpointUpdate.json
 */
async function updateAPairOfVirtualEndpointsForAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.virtualEndpoints.update(
    "exampleresourcegroup",
    "exampleserver",
    "examplebasename",
    { endpointType: "ReadWrite", members: ["exampleprimaryserver"] },
  );
  console.log(result);
}

async function main() {
  await updateAPairOfVirtualEndpointsForAServer();
}

main().catch(console.error);
