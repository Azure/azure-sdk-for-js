// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets managed traffic configuration for a Web App.
 *
 * @summary gets managed traffic configuration for a Web App.
 * x-ms-original-file: 2026-08-01/ManagedTrafficConfigResources_GetManagedTrafficConfig.json
 */
async function getManagedTrafficConfigurationOfAWebApp(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.managedTrafficConfigResources.getManagedTrafficConfig(
    "testrg123",
    "sitef6141",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getManagedTrafficConfigurationOfAWebApp();
}

main().catch(console.error);
