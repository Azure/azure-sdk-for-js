// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a credit.
 *
 * @summary update a credit.
 * x-ms-original-file: 2025-12-01-preview/CreditTagsUpdate.json
 */
async function creditTagsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "97ee05f2-07d5-494d-908c-081a197f4277";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.credits.update("resource_group_name_01", "credit_20231212", {
    tags: { key1: "value4", key2: "value5" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await creditTagsUpdate();
}

main().catch(console.error);
