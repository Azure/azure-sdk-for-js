// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to commit the migrated Azure Frontdoor(Standard/Premium) profile.
 *
 * @summary commit the migrated Azure Frontdoor(Standard/Premium) profile.
 * x-ms-original-file: 2025-12-01/Profiles_MigrationCommit.json
 */
async function profilesMigrationCommit() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  await client.profiles.migrationCommit("RG", "profile1");
}

async function main() {
  await profilesMigrationCommit();
}

main().catch(console.error);
