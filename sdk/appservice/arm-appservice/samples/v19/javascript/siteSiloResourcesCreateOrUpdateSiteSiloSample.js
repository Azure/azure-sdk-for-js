// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a silo for a Web App. Returns 202 with polling headers when background work is queued, or 200 when no update is needed.
 *
 * @summary creates or updates a silo for a Web App. Returns 202 with polling headers when background work is queued, or 200 when no update is needed.
 * x-ms-original-file: 2026-08-01/SiteSiloResources_CreateOrUpdateSiteSilo.json
 */
async function createOrUpdateASiloOfAWebApp() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.siteSiloResources.createOrUpdateSiteSilo(
    "testrg123",
    "sitef6141",
    "silo1",
    {
      location: "West US 2",
      properties: {
        primarySiteName: "sitef6141",
        primaryLocation: "East US",
        siloLocation: "West US 2",
        endpointStatus: "Enabled",
        trafficMode: "Active",
        networkingOverride: {
          vnetIntegrationOverride:
            "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/testrg123/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/silo-subnet",
        },
        followLastKnownGood: false,
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateASiloOfAWebApp();
}

main().catch(console.error);
