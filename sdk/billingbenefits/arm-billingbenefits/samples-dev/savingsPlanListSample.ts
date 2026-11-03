// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list savings plans in an order.
 *
 * @summary list savings plans in an order.
 * x-ms-original-file: 2025-12-01-preview/SavingsPlansInOrderList.json
 */
async function savingsPlansInOrderList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const resArray = new Array();
  for await (const item of client.savingsPlan.list("20000000-0000-0000-0000-000000000000")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await savingsPlansInOrderList();
}

main().catch(console.error);
