// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Creates or updates an App Service Plan.
 *
 * @summary description for Creates or updates an App Service Plan.
 * x-ms-original-file: 2025-05-01/CreateOrUpdateAppServicePlan.json
 */
async function createOrUpdateAppServicePlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.appServicePlans.createOrUpdate("testrg123", "testsf6141", {
    kind: "app",
    location: "East US",
    sku: { name: "P1", capacity: 1, family: "P", size: "P1", tier: "Premium" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAppServicePlan();
}

main().catch(console.error);
