// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a pair of virtual endpoints for a server.
 *
 * @summary updates a pair of virtual endpoints for a server.
 * x-ms-original-file: 2026-01-01-preview/VirtualEndpointUpdate.json
 */
async function updateAPairOfVirtualEndpointsForAServer(): Promise<void> {
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

async function main(): Promise<void> {
  await updateAPairOfVirtualEndpointsForAServer();
}

main().catch(console.error);
