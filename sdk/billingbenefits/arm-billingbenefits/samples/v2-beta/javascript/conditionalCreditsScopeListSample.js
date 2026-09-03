// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list conditional credits that are applicable for a given scope. Currently supported scopes: billing accounts
 *
 * @summary list conditional credits that are applicable for a given scope. Currently supported scopes: billing accounts
 * x-ms-original-file: 2025-12-01-preview/ApplicableConditionalCreditList.json
 */
async function conditionalCreditScopeList() {
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

async function main() {
  await conditionalCreditScopeList();
}

main().catch(console.error);
