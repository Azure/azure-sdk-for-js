// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list applicable credits for the provided scope. Currently supported scopes: BillingAccountResourceId
 *
 * @summary list applicable credits for the provided scope. Currently supported scopes: BillingAccountResourceId
 * x-ms-original-file: 2025-12-01-preview/CreditListApplicableCredits.json
 */
async function creditSourcesListByCredit(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const resArray = new Array();
  for await (const item of client.credits.listApplicable(
    "providers/Microsoft.Billing/billingAccounts/{acctId}",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await creditSourcesListByCredit();
}

main().catch(console.error);
