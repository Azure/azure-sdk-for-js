// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  VirtualEndpointResourceForPatch} from "@azure/arm-postgresql-flexible";
import {
  PostgreSQLManagementFlexibleServerClient,
} from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates a pair of virtual endpoints for a server.
 *
 * @summary Updates a pair of virtual endpoints for a server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/VirtualEndpointUpdate.json
 */
async function updateAPairOfVirtualEndpointsForAServer(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const virtualEndpointName = "examplebasename";
  const parameters: VirtualEndpointResourceForPatch = {
    endpointType: "ReadWrite",
    members: ["exampleprimaryserver"],
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.virtualEndpoints.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    virtualEndpointName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAPairOfVirtualEndpointsForAServer();
}

main().catch(console.error);
