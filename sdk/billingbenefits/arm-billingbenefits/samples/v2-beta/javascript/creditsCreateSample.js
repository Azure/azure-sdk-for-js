// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a credit.
 *
 * @summary create a credit.
 * x-ms-original-file: 2025-12-01-preview/CreditCreate.json
 */
async function creditCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "97ee05f2-07d5-494d-908c-081a197f4277";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.credits.create("resource_group_name_01", "credit_20231212", {
    location: "global",
    credit: { amount: 20000, currencyCode: "USD", grain: "FullTerm" },
    endAt: new Date("2024-01-12T00:00:00Z"),
    productCode: "0002d726-0000-0160-330f-a0b98cdbbdc4",
    startAt: new Date("2023-12-12T00:00:00Z"),
    tags: { key1: "value1", key2: "value2" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a credit.
 *
 * @summary create a credit.
 * x-ms-original-file: 2025-12-01-preview/EndCustomerInvestmentFundCreditCreate.json
 */
async function endCustomerInvestmentFundCreditCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "97ee05f2-07d5-494d-908c-081a197f4277";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.credits.create("resource_group_name_01", "credit_20231212", {
    location: "global",
    breakdown: [
      {
        allocation: { amount: 25000, currencyCode: "USD", grain: "FullTerm" },
        dimensions: [
          { key: "productFamily", value: "Azure" },
          { key: "productCode", value: "00002b30-0000-0260-d348-f3ffcd565473" },
          { key: "creditType", value: "EndCustomerInvestmentCredit" },
          { key: "supplierType", value: "External" },
        ],
        endAt: new Date("2025-08-31T23:59:59.999Z"),
        startAt: new Date("2025-08-01T00:00:00Z"),
      },
    ],
    credit: { amount: 25000, currencyCode: "USD", grain: "FullTerm" },
    endAt: new Date("2025-08-31T23:59:59.999Z"),
    productCode: "00002b30-0000-0260-d348-f3ffcd565473",
    startAt: new Date("2025-08-01T00:00:00Z"),
    tags: { key1: "value1", key2: "value2" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a credit.
 *
 * @summary create a credit.
 * x-ms-original-file: 2025-12-01-preview/PromotionalCreditCreate.json
 */
async function promotionalCreditCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "97ee05f2-07d5-494d-908c-081a197f4277";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.credits.create("resource_group_name_01", "credit_20231212", {
    location: "global",
    policies: { expiration: "SuspendBillingProfile", redemption: "AutoRedeem" },
    productCode: "0002d726-0000-0160-330f-a0b98cdbbdc4",
    tags: { key1: "value1", key2: "value2" },
  });
  console.log(result);
}

async function main() {
  await creditCreate();
  await endCustomerInvestmentFundCreditCreate();
  await promotionalCreditCreate();
}

main().catch(console.error);
