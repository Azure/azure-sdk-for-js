// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get subscription-level location-based Playwright quota resource by name.
 *
 * @summary get subscription-level location-based Playwright quota resource by name.
 * x-ms-original-file: 2025-07-01-preview/PlaywrightQuotas_Get.json
 */

import { PlaywrightManagementClient } from "@azure/arm-playwright";
import { DefaultAzureCredential } from "@azure/identity";

async function playwrightQuotasGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlaywrightManagementClient(credential, subscriptionId);
  const result = await client.playwrightQuotas.get("eastus", "ExecutionMinutes");
  console.log(result);
}

async function main(): Promise<void> {
  await playwrightQuotasGet();
}

main().catch(console.error);
