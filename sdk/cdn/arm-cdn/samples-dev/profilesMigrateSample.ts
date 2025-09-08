// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Migrate the CDN profile to Azure Frontdoor(Standard/Premium) profile. The change need to be committed after this.
 *
 * @summary Migrate the CDN profile to Azure Frontdoor(Standard/Premium) profile. The change need to be committed after this.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/Profiles_Migrate.json
 */

import type { MigrationParameters } from "@azure/arm-cdn";
import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function profilesMigrate(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const migrationParameters: MigrationParameters = {
    classicResourceReference: {
      id: "/subscriptions/subid/resourcegroups/RG/providers/Microsoft.Network/frontdoors/frontdoorname",
    },
    profileName: "profile1",
    sku: { name: "Standard_AzureFrontDoor" },
  };
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.profiles.beginMigrateAndWait(resourceGroupName, migrationParameters);
  console.log(result);
}

async function main(): Promise<void> {
  await profilesMigrate();
}

main().catch(console.error);
