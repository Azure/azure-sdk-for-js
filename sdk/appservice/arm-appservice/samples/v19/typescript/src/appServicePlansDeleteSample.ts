// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Delete an App Service plan.
 *
 * @summary description for Delete an App Service plan.
 * x-ms-original-file: 2025-05-01/DeleteAppServicePlan.json
 */
async function deleteAppServicePlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.appServicePlans.delete("testrg123", "testsf6141");
}

async function main(): Promise<void> {
  await deleteAppServicePlan();
}

main().catch(console.error);
