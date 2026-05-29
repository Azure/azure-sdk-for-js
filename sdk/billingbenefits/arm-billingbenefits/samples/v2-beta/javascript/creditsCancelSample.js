// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancels a credit.
 *
 * @summary cancels a credit.
 * x-ms-original-file: 2025-12-01-preview/CreditCancel.json
 */
async function creditCancel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "97ee05f2-07d5-494d-908c-081a197f4277";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.credits.cancel("resource_group_name_01", "credit_20231212");
  console.log(result);
}

async function main() {
  await creditCancel();
}

main().catch(console.error);
