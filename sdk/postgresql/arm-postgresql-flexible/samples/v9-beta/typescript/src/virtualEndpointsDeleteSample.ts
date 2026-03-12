// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a pair of virtual endpoints.
 *
 * @summary deletes a pair of virtual endpoints.
 * x-ms-original-file: 2026-01-01-preview/VirtualEndpointDelete.json
 */
async function deleteAPairOfVirtualEndpoints(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.virtualEndpoints.delete("exampleresourcegroup", "exampleserver", "examplebasename");
}

async function main(): Promise<void> {
  await deleteAPairOfVirtualEndpoints();
}

main().catch(console.error);
