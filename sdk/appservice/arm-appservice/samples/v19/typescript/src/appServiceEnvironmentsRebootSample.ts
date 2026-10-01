// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Reboot all machines in an App Service Environment.
 *
 * @summary description for Reboot all machines in an App Service Environment.
 * x-ms-original-file: 2025-05-01/AppServiceEnvironments_Reboot.json
 */
async function rebootAllMachinesInAnAppServiceEnvironment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.appServiceEnvironments.reboot("test-rg", "test-ase");
}

async function main(): Promise<void> {
  await rebootAllMachinesInAnAppServiceEnvironment();
}

main().catch(console.error);
