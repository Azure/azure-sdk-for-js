// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a private link resource for PostgreSQL server.
 *
 * @summary gets a private link resource for PostgreSQL server.
 * x-ms-original-file: 2026-01-01-preview/PrivateLinkResourcesGet.json
 */
async function getsAPrivateLinkResourceForPostgreSQL(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get(
    "exampleresourcegroup",
    "exampleserver",
    "exampleprivatelink",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsAPrivateLinkResourceForPostgreSQL();
}

main().catch(console.error);
