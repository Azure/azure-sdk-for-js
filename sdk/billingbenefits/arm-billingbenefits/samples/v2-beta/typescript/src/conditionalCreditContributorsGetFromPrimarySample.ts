// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a conditional credit contributor for primary service admin
 *
 * @summary get a conditional credit contributor for primary service admin
 * x-ms-original-file: 2025-12-01-preview/ConditionalCreditContributorGetFromPrimary.json
 */
async function conditionalCreditContributorGetFromPrimary(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.conditionalCreditContributors.getFromPrimary(
    "resource_group_name_01",
    "conditionalCredit_20250801",
    "caco_contributor_20250801",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await conditionalCreditContributorGetFromPrimary();
}

main().catch(console.error);
