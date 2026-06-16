// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list conditional credits that are applicable for a given scope. Currently supported scopes: billing accounts
 *
 * @summary list conditional credits that are applicable for a given scope. Currently supported scopes: billing accounts
 * x-ms-original-file: 2025-12-01-preview/ApplicableConditionalCreditList.json
 */
async function conditionalCreditScopeList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const resArray = new Array();
  for await (const item of client.conditionalCredits.scopeList(
    "providers/Microsoft.Billing/billingAccounts/{acctId}",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await conditionalCreditScopeList();
}

main().catch(console.error);
