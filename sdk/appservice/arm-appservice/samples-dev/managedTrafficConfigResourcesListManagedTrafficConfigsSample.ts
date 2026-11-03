// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists managed traffic configuration resources for a Web App.
 *
 * @summary lists managed traffic configuration resources for a Web App.
 * x-ms-original-file: 2026-08-01/ManagedTrafficConfigResources_ListManagedTrafficConfigs.json
 */
async function listManagedTrafficConfigurationOfAWebApp(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedTrafficConfigResources.listManagedTrafficConfigs(
    "testrg123",
    "sitef6141",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listManagedTrafficConfigurationOfAWebApp();
}

main().catch(console.error);
