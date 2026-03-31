// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Creates or updates an App Service Plan.
 *
 * @summary description for Creates or updates an App Service Plan.
 * x-ms-original-file: 2025-05-01/PatchAppServicePlan.json
 */
async function patchServicePlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.appServicePlans.update("testrg123", "testsf6141", { kind: "app" });
  console.log(result);
}

async function main(): Promise<void> {
  await patchServicePlan();
}

main().catch(console.error);
