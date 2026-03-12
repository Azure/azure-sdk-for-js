// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to action to retrieve the PostgreSQL versions.
 *
 * @summary action to retrieve the PostgreSQL versions.
 * x-ms-original-file: 2025-03-01/Organizations_GetPostgresVersions_MaximumSet_Gen.json
 */

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

async function organizationsGetPostgresVersionsMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B8E3300-C5FA-442B-A259-3F6F614D5BD4";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.organizations.getPostgresVersions("rgneon", {
    parameters: { version: 7 },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to action to retrieve the PostgreSQL versions.
 *
 * @summary action to retrieve the PostgreSQL versions.
 * x-ms-original-file: 2025-03-01/Organizations_GetPostgresVersions_MinimumSet_Gen.json
 */
async function organizationsGetPostgresVersionsMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B8E3300-C5FA-442B-A259-3F6F614D5BD4";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.organizations.getPostgresVersions("rgneon");
  console.log(result);
}

async function main(): Promise<void> {
  await organizationsGetPostgresVersionsMaximumSet();
  await organizationsGetPostgresVersionsMinimumSet();
}

main().catch(console.error);
