// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the machine key of an app.
 *
 * @summary updates the machine key of an app.
 * x-ms-original-file: 2025-05-01/UpdateMachineKey.json
 */
async function updatesTheMachineKeyForASite(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.updateMachineKey("rg", "contoso");
  console.log(result);
}

async function main(): Promise<void> {
  await updatesTheMachineKeyForASite();
}

main().catch(console.error);
