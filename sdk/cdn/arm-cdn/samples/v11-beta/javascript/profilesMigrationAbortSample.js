// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to abort the migration to Azure Frontdoor Premium/Standard.
 *
 * @summary abort the migration to Azure Frontdoor Premium/Standard.
 * x-ms-original-file: 2026-09-01-preview/Profiles_MigrationAbort.json
 */
async function profilesMigrationAbort() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  await client.profiles.migrationAbort("RG", "profile1");
}

async function main() {
  await profilesMigrationAbort();
}

main().catch(console.error);
