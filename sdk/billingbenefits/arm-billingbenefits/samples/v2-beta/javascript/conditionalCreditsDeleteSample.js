// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a conditional credit.
 *
 * @summary delete a conditional credit.
 * x-ms-original-file: 2025-12-01-preview/ConditionalCreditDelete.json
 */
async function conditionalCreditDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  await client.conditionalCredits.delete("resource_group_name_01", "conditionalCredit_20250801");
}

async function main() {
  await conditionalCreditDelete();
}

main().catch(console.error);
