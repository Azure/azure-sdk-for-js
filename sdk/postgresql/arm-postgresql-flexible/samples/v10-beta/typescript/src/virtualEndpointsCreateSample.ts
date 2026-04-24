// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a pair of virtual endpoints for a server.
 *
 * @summary creates a pair of virtual endpoints for a server.
 * x-ms-original-file: 2026-01-01-preview/VirtualEndpointCreate.json
 */
async function createAPairOfVirtualEndpointsForAServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.virtualEndpoints.create(
    "exampleresourcegroup",
    "exampleserver",
    "examplebasename",
    { endpointType: "ReadWrite", members: ["exampleprimaryserver"] },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAPairOfVirtualEndpointsForAServer();
}

main().catch(console.error);
