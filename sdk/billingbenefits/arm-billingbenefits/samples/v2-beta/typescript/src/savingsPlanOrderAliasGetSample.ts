// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a savings plan.
 *
 * @summary get a savings plan.
 * x-ms-original-file: 2025-12-01-preview/SavingsPlanOrderAliasGet.json
 */
async function savingsPlanOrderAliasGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.savingsPlanOrderAlias.get("spAlias123");
  console.log(result);
}

async function main(): Promise<void> {
  await savingsPlanOrderAliasGet();
}

main().catch(console.error);
