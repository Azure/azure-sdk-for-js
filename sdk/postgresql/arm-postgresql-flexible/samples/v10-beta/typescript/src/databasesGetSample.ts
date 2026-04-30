// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about an existing database.
 *
 * @summary gets information about an existing database.
 * x-ms-original-file: 2026-01-01-preview/DatabasesGet.json
 */
async function getInformationAboutAnExistingDatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.databases.get(
    "exampleresourcegroup",
    "exampleserver",
    "exampledatabase",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getInformationAboutAnExistingDatabase();
}

main().catch(console.error);
