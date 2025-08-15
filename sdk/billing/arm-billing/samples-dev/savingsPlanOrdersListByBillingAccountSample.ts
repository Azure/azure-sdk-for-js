// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List all Savings plan orders by billing account.
 *
 * @summary List all Savings plan orders by billing account.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/savingsPlanOrderListByBillingAccount.json
 */
async function savingsPlanOrderList(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.savingsPlanOrders.listByBillingAccount(billingAccountName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await savingsPlanOrderList();
}

main().catch(console.error);
