// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists pair of virtual endpoints associated to a server.
 *
 * @summary lists pair of virtual endpoints associated to a server.
 * x-ms-original-file: 2026-01-01-preview/VirtualEndpointsListByServer.json
 */
async function listPairOfVirtualEndpointsAssociatedToAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualEndpoints.listByServer(
    "exampleresourcegroup",
    "exampleserver",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPairOfVirtualEndpointsAssociatedToAServer();
}

main().catch(console.error);
