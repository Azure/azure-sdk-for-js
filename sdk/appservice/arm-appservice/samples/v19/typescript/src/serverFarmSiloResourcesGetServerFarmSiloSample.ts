// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a specific silo for an App Service plan.
 *
 * @summary gets a specific silo for an App Service plan.
 * x-ms-original-file: 2026-08-01/ServerFarmSiloResources_GetServerFarmSilo.json
 */
async function getASiloOfAnAppServicePlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.serverFarmSiloResources.getServerFarmSilo(
    "testrg123",
    "testsf6141",
    "silo1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getASiloOfAnAppServicePlan();
}

main().catch(console.error);
