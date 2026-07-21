// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks if CDN profile can be migrated to Azure Frontdoor(Standard/Premium) profile.
 *
 * @summary checks if CDN profile can be migrated to Azure Frontdoor(Standard/Premium) profile.
 * x-ms-original-file: 2025-12-01/CdnProfiles_CanMigrate.json
 */
async function profilesCdnCanMigrate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.profiles.cdnCanMigrateToAfd("RG", "profile1");
  console.log(result);
}

async function main(): Promise<void> {
  await profilesCdnCanMigrate();
}

main().catch(console.error);
