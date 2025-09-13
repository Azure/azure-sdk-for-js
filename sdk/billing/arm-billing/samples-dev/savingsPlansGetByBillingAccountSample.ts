// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get savings plan by billing account.
 *
 * @summary Get savings plan by billing account.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/savingsPlanGetByBillingAccount.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function savingsPlanGet(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const savingsPlanOrderId = "20000000-0000-0000-0000-000000000000";
  const savingsPlanId = "30000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.savingsPlans.getByBillingAccount(
    billingAccountName,
    savingsPlanOrderId,
    savingsPlanId,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Get savings plan by billing account.
 *
 * @summary Get savings plan by billing account.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/savingsPlanGetExpandRenewPropertiesByBillingAccount.json
 */
async function savingsPlanGetExpandRenewProperties(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const savingsPlanOrderId = "20000000-0000-0000-0000-000000000000";
  const savingsPlanId = "30000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.savingsPlans.getByBillingAccount(
    billingAccountName,
    savingsPlanOrderId,
    savingsPlanId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await savingsPlanGet();
  await savingsPlanGetExpandRenewProperties();
}

main().catch(console.error);
