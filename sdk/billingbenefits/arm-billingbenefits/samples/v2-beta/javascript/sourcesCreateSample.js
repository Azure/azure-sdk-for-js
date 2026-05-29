// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a credit source.
 *
 * @summary create a credit source.
 * x-ms-original-file: 2025-12-01-preview/CreditSourceCreate.json
 */
async function creditSourceCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "97ee05f2-07d5-494d-908c-081a197f4277";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.sources.create(
    "resource_group_name_01",
    "credit_20231212",
    "source_20231212",
    {
      location: "global",
      credit: { amount: 20000, currencyCode: "USD", grain: "FullTerm" },
      impactedBillingPeriod: "202304",
      sourceResourceId: "/subscriptions/{subId}",
      tags: { key1: "value1", key2: "value2" },
    },
  );
  console.log(result);
}

async function main() {
  await creditSourceCreate();
}

main().catch(console.error);
