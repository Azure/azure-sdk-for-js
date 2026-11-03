// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list savings plans by billing account.
 *
 * @summary list savings plans by billing account.
 * x-ms-original-file: 2024-04-01/savingsPlansListByBillingAccount.json
 */
async function savingsPlansList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.savingsPlans.listByBillingAccount(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    { take: 3, selectedState: "Succeeded", refreshSummary: "true" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await savingsPlansList();
}

main().catch(console.error);
