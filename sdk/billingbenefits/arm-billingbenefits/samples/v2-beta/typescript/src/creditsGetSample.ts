// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a credit.
 *
 * @summary get a credit.
 * x-ms-original-file: 2025-12-01-preview/CreditGet.json
 */
async function creditGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "97ee05f2-07d5-494d-908c-081a197f4277";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.credits.get("resource_group_name_01", "credit_20231212");
  console.log(result);
}

async function main(): Promise<void> {
  await creditGet();
}

main().catch(console.error);
