// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list discounts at resource group level
 *
 * @summary list discounts at resource group level
 * x-ms-original-file: 2025-12-01-preview/DiscountResourceGroupList.json
 */
async function discountResourceGroupList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "30000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.discounts.resourceGroupList("testrg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await discountResourceGroupList();
}

main().catch(console.error);
