// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to elevate as owner on savings plan order based on billing permissions.
 *
 * @summary elevate as owner on savings plan order based on billing permissions.
 * x-ms-original-file: 2025-12-01-preview/SavingsPlanOrderElevate.json
 */
async function savingsPlanOrderElevate() {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.savingsPlanOrder.elevate("20000000-0000-0000-0000-000000000000");
  console.log(result);
}

async function main() {
  await savingsPlanOrderElevate();
}

main().catch(console.error);
