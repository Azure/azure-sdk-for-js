// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a savings plan order by billing account.
 *
 * @summary Get a savings plan order by billing account.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/savingsPlanOrderGetByBillingAccount.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function savingsPlanOrderGet(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const savingsPlanOrderId = "20000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.savingsPlanOrders.getByBillingAccount(
    billingAccountName,
    savingsPlanOrderId,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Get a savings plan order by billing account.
 *
 * @summary Get a savings plan order by billing account.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/savingsPlanOrderExpandedScheduleGetByBillingAccount.json
 */
async function savingsPlanOrderWithExpandedPaymentsGet(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const savingsPlanOrderId = "20000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.savingsPlanOrders.getByBillingAccount(
    billingAccountName,
    savingsPlanOrderId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await savingsPlanOrderGet();
  await savingsPlanOrderWithExpandedPaymentsGet();
}

main().catch(console.error);
