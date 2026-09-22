// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a credit source.
 *
 * @summary get a credit source.
 * x-ms-original-file: 2025-12-01-preview/CreditSourceGet.json
 */
async function creditSourceGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "97ee05f2-07d5-494d-908c-081a197f4277";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.sources.get(
    "resource_group_name_01",
    "credit_20231212",
    "source_20231212",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await creditSourceGet();
}

main().catch(console.error);
