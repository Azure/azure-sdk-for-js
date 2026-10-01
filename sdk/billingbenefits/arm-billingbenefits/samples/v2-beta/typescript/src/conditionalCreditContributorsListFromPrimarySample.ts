// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list contributors under a primary conditional credit for primary service admin
 *
 * @summary list contributors under a primary conditional credit for primary service admin
 * x-ms-original-file: 2025-12-01-preview/ConditionalCreditContributorsListFromPrimary.json
 */
async function conditionalCreditContributorsListFromPrimary(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.conditionalCreditContributors.listFromPrimary(
    "resource_group_name_01",
    "conditionalCredit_20250801",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await conditionalCreditContributorsListFromPrimary();
}

main().catch(console.error);
