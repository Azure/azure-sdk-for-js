// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to action to retrieve the PostgreSQL versions.
 *
 * @summary action to retrieve the PostgreSQL versions.
 * x-ms-original-file: 2025-06-23-preview/Organizations_GetPostgresVersions_MaximumSet_Gen.json
 */
async function organizationsGetPostgresVersionsMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DFF26289-4E9C-46D0-890E-F8BE27BDA8C2";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.organizations.getPostgresVersions("rgneon", {
    parameters: { version: 25 },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to action to retrieve the PostgreSQL versions.
 *
 * @summary action to retrieve the PostgreSQL versions.
 * x-ms-original-file: 2025-06-23-preview/Organizations_GetPostgresVersions_MinimumSet_Gen.json
 */
async function organizationsGetPostgresVersionsMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DFF26289-4E9C-46D0-890E-F8BE27BDA8C2";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.organizations.getPostgresVersions("rgneon");
  console.log(result);
}

async function main(): Promise<void> {
  await organizationsGetPostgresVersionsMaximumSet();
  await organizationsGetPostgresVersionsMinimumSet();
}

main().catch(console.error);
