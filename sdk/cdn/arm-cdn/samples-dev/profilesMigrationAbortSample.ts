// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to abort the migration to Azure Frontdoor Premium/Standard.
 *
 * @summary abort the migration to Azure Frontdoor Premium/Standard.
 * x-ms-original-file: 2025-12-01/Profiles_MigrationAbort.json
 */
async function profilesCdnMigrationCommit(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  await client.profiles.migrationAbort("RG", "profile1");
}

async function main(): Promise<void> {
  await profilesCdnMigrationCommit();
}

main().catch(console.error);
