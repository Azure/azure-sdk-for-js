// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to migrate the CDN profile to Azure Frontdoor(Standard/Premium) profile. This step prepares the profile for migration and will be followed by Commit to finalize the migration.
 *
 * @summary migrate the CDN profile to Azure Frontdoor(Standard/Premium) profile. This step prepares the profile for migration and will be followed by Commit to finalize the migration.
 * x-ms-original-file: 2025-12-01/CdnProfiles_Migrate.json
 */
async function profilesCdnMigrate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.profiles.cdnMigrateToAfd("RG", "profile1", {
    sku: { name: "Standard_AzureFrontDoor" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await profilesCdnMigrate();
}

main().catch(console.error);
