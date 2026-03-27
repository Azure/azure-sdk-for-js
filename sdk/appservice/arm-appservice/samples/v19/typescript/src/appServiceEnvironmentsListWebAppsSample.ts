// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Get all apps in an App Service Environment.
 *
 * @summary description for Get all apps in an App Service Environment.
 * x-ms-original-file: 2025-05-01/AppServiceEnvironments_ListWebApps.json
 */
async function getAllAppsInAnAppServiceEnvironment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.appServiceEnvironments.listWebApps("test-rg", "test-ase")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAllAppsInAnAppServiceEnvironment();
}

main().catch(console.error);
