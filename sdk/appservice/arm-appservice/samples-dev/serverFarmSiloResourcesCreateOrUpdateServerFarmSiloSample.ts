// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a silo for an App Service plan. Returns 202 with polling headers when background work is queued, or 200 when no update is needed.
 *
 * @summary creates or updates a silo for an App Service plan. Returns 202 with polling headers when background work is queued, or 200 when no update is needed.
 * x-ms-original-file: 2026-08-01/ServerFarmSiloResources_CreateOrUpdateServerFarmSilo.json
 */
async function createOrUpdateASiloOfAnAppServicePlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.serverFarmSiloResources.createOrUpdateServerFarmSilo(
    "testrg123",
    "testsf6141",
    "silo1",
    {
      location: "West US 2",
      properties: {
        primaryServerFarmName: "testsf6141",
        primaryLocation: "East US",
        siloLocation: "West US 2",
        instanceNumberOverride: 3,
        zoneRedundantOverride: true,
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateASiloOfAnAppServicePlan();
}

main().catch(console.error);
