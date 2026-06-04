// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete discount. Clears the metadata from the user's view.
 *
 * @summary delete discount. Clears the metadata from the user's view.
 * x-ms-original-file: 2025-12-01-preview/DiscountsDelete.json
 */
async function reservationOrderAliasCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "30000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  await client.discounts.delete("testrg", "testdiscount");
}

async function main() {
  await reservationOrderAliasCreate();
}

main().catch(console.error);
