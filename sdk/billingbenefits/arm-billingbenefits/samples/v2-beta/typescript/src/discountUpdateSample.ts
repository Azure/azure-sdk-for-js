// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update discounts
 *
 * @summary update discounts
 * x-ms-original-file: 2025-12-01-preview/DiscountsUpdate.json
 */
async function discountGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "30000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.discount.update("testrg", "testprimarydiscount", {
    displayName: "Virtual Machines D Series",
    tags: { key1: "value1", key2: "value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await discountGet();
}

main().catch(console.error);
