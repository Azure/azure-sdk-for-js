// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SavingsPlansListByBillingAccountOptionalParams } from "@azure/arm-billing";
import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List savings plans by billing account.
 *
 * @summary List savings plans by billing account.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/savingsPlansListByBillingAccount.json
 */
async function savingsPlansList(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const take = 3;
  const selectedState = "Succeeded";
  const refreshSummary = "true";
  const options: SavingsPlansListByBillingAccountOptionalParams = {
    take,
    selectedState,
    refreshSummary,
  };
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.savingsPlans.listByBillingAccount(billingAccountName, options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await savingsPlansList();
}

main().catch(console.error);
