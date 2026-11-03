// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all Savings plan orders.
 *
 * @summary list all Savings plan orders.
 * x-ms-original-file: 2025-12-01-preview/SavingsPlanOrderList.json
 */
async function savingsPlanOrderList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const resArray = new Array();
  for await (const item of client.savingsPlanOrder.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await savingsPlanOrderList();
}

main().catch(console.error);
