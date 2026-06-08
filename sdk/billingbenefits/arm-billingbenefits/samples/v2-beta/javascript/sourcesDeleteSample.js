// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a credit source.
 *
 * @summary delete a credit source.
 * x-ms-original-file: 2025-12-01-preview/CreditSourceDelete.json
 */
async function creditSourceDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "97ee05f2-07d5-494d-908c-081a197f4277";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  await client.sources.delete("resource_group_name_01", "credit_20231212", "source_20231212");
}

async function main() {
  await creditSourceDelete();
}

main().catch(console.error);
