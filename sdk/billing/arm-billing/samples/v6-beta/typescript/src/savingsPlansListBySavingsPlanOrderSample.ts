// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list savings plans in an order by billing account.
 *
 * @summary list savings plans in an order by billing account.
 * x-ms-original-file: 2024-04-01/savingsPlansListBySavingsPlanOrders.json
 */
async function savingsPlansInOrderList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.savingsPlans.listBySavingsPlanOrder(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "20000000-0000-0000-0000-000000000000",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await savingsPlansInOrderList();
}

main().catch(console.error);
