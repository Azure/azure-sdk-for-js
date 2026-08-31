// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to migrate the CDN profile to Azure Frontdoor(Standard/Premium) profile. The change need to be committed after this.
 *
 * @summary migrate the CDN profile to Azure Frontdoor(Standard/Premium) profile. The change need to be committed after this.
 * x-ms-original-file: 2025-12-01/Profiles_Migrate.json
 */
async function profilesMigrate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.profiles.migrate("RG", {
    classicResourceReference: {
      id: "/subscriptions/subid/resourcegroups/RG/providers/Microsoft.Network/frontdoors/frontdoorname",
    },
    profileName: "profile1",
    sku: { name: "Standard_AzureFrontDoor" },
  });
  console.log(result);
}

async function main() {
  await profilesMigrate();
}

main().catch(console.error);
