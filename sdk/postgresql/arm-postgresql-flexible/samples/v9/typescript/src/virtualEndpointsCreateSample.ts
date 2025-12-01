// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  VirtualEndpoint} from "@azure/arm-postgresql-flexible";
import {
  PostgreSQLManagementFlexibleServerClient,
} from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a pair of virtual endpoints for a server.
 *
 * @summary Creates a pair of virtual endpoints for a server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/VirtualEndpointCreate.json
 */
async function createAPairOfVirtualEndpointsForAServer(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const virtualEndpointName = "examplebasename";
  const parameters: VirtualEndpoint = {
    endpointType: "ReadWrite",
    members: ["exampleprimaryserver"],
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.virtualEndpoints.beginCreateAndWait(
    resourceGroupName,
    serverName,
    virtualEndpointName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAPairOfVirtualEndpointsForAServer();
}

main().catch(console.error);
