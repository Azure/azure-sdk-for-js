// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get savings plan by billing account.
 *
 * @summary get savings plan by billing account.
 * x-ms-original-file: 2024-04-01/savingsPlanGetByBillingAccount.json
 */
async function savingsPlanGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.savingsPlans.getByBillingAccount(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "20000000-0000-0000-0000-000000000000",
    "30000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get savings plan by billing account.
 *
 * @summary get savings plan by billing account.
 * x-ms-original-file: 2024-04-01/savingsPlanGetExpandRenewPropertiesByBillingAccount.json
 */
async function savingsPlanGetExpandRenewProperties(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.savingsPlans.getByBillingAccount(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "20000000-0000-0000-0000-000000000000",
    "30000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await savingsPlanGet();
  await savingsPlanGetExpandRenewProperties();
}

main().catch(console.error);
