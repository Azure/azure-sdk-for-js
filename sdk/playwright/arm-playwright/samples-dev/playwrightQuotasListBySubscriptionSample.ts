// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to lists Playwright quota resources for a given subscription ID.
 *
 * @summary lists Playwright quota resources for a given subscription ID.
 * x-ms-original-file: 2025-09-01/PlaywrightQuotas_ListBySubscription.json
 */

import { PlaywrightManagementClient } from "@azure/arm-playwright";
import { DefaultAzureCredential } from "@azure/identity";

async function playwrightQuotasListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlaywrightManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.playwrightQuotas.listBySubscription("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await playwrightQuotasListBySubscription();
}

main().catch(console.error);
