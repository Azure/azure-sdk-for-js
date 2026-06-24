// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks if CDN profile can be migrated to Azure Frontdoor(Standard/Premium) profile.
 *
 * @summary checks if CDN profile can be migrated to Azure Frontdoor(Standard/Premium) profile.
 * x-ms-original-file: 2025-12-01/Profiles_CanMigrate.json
 */
async function profilesCanMigrate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.profiles.canMigrate("RG", {
    classicResourceReference: {
      id: "/subscriptions/subid/resourcegroups/RG/providers/Microsoft.Network/frontdoors/frontdoorname",
    },
  });
  console.log(result);
}

async function main() {
  await profilesCanMigrate();
}

main().catch(console.error);
