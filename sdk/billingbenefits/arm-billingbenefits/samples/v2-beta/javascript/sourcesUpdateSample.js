// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a credit source.
 *
 * @summary update a credit source.
 * x-ms-original-file: 2025-12-01-preview/CreditSourceTagsUpdate.json
 */
async function creditSourceTagsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "97ee05f2-07d5-494d-908c-081a197f4277";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.sources.update(
    "resource_group_name_01",
    "credit_20231212",
    "source_20231212",
    { tags: { key1: "value4", key2: "value5" } },
  );
  console.log(result);
}

async function main() {
  await creditSourceTagsUpdate();
}

main().catch(console.error);
