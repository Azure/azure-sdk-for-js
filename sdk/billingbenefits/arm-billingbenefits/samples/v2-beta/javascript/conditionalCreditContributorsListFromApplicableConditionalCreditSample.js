// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list contributors under applicable conditional credits for a given billing account.
 *
 * @summary list contributors under applicable conditional credits for a given billing account.
 * x-ms-original-file: 2025-12-01-preview/ConditionalCreditContributorsListFromApplicableConditionalCredit.json
 */
async function conditionalCreditContributorsScopeList() {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const resArray = new Array();
  for await (const item of client.conditionalCreditContributors.listFromApplicableConditionalCredit(
    "20000000-1000-0000-0000-000000000000:20000000-0000-3000-0000-000000000000_2019-05-31",
    "C20251028000000000000",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await conditionalCreditContributorsScopeList();
}

main().catch(console.error);
