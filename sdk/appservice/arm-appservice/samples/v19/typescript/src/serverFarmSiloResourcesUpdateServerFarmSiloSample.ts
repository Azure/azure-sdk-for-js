// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates only the tags of an App Service plan silo. Silo configuration and provisioning state are not modified.
 *
 * @summary updates only the tags of an App Service plan silo. Silo configuration and provisioning state are not modified.
 * x-ms-original-file: 2026-08-01/ServerFarmSiloResources_UpdateServerFarmSilo.json
 */
async function updateTagsOnAnAppServicePlanSilo(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.serverFarmSiloResources.updateServerFarmSilo(
    "testrg123",
    "testsf6141",
    "silo1",
    { tags: { environment: "production", team: "web-platform" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateTagsOnAnAppServicePlanSilo();
}

main().catch(console.error);
