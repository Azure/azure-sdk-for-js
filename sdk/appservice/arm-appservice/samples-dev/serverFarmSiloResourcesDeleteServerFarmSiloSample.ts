// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a silo for an App Service plan.
 *
 * @summary deletes a silo for an App Service plan.
 * x-ms-original-file: 2026-08-01/ServerFarmSiloResources_DeleteServerFarmSilo.json
 */
async function deleteASiloOfAnAppServicePlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.serverFarmSiloResources.deleteServerFarmSilo("testrg123", "testsf6141", "silo1");
}

async function main(): Promise<void> {
  await deleteASiloOfAnAppServicePlan();
}

main().catch(console.error);
