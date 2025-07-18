// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlaywrightManagementClient } from "@azure/arm-playwright";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Playwright quota resources for a given subscription Id.
 *
 * @summary list Playwright quota resources for a given subscription Id.
 * x-ms-original-file: 2025-07-01-preview/PlaywrightQuotas_ListBySubscription.json
 */
async function playwrightQuotasListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlaywrightManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.playwrightQuotas.listBySubscription(
    "eastus",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await playwrightQuotasListBySubscription();
}

main().catch(console.error);
