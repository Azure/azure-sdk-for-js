// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CanMigrateParameters } from "@azure/arm-cdn";
import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Checks if CDN profile can be migrated to Azure Frontdoor(Standard/Premium) profile.
 *
 * @summary Checks if CDN profile can be migrated to Azure Frontdoor(Standard/Premium) profile.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/Profiles_CanMigrate.json
 */
async function profilesCanMigrate(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const canMigrateParameters: CanMigrateParameters = {
    classicResourceReference: {
      id: "/subscriptions/subid/resourcegroups/RG/providers/Microsoft.Network/frontdoors/frontdoorname",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.profiles.beginCanMigrateAndWait(
    resourceGroupName,
    canMigrateParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await profilesCanMigrate();
}

main().catch(console.error);
