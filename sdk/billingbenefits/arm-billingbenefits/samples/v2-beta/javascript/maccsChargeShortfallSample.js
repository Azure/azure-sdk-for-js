// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to operation to charge shortfall to a customer's account, ensuring they are charged for the outstanding amount of MACC credit.
 *
 * @summary operation to charge shortfall to a customer's account, ensuring they are charged for the outstanding amount of MACC credit.
 * x-ms-original-file: 2025-12-01-preview/MaccChargeShortfall.json
 */
async function maccsChargeShortfall() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.maccs.chargeShortfall("resource_group_name_01", "macc_20230614", {
    charge: { amount: 20000, currencyCode: "USD", grain: "FullTerm" },
    endAt: new Date("2024-07-01T00:00:00Z"),
    productCode: "000278da-0000-0160-330f-a0b98cdbbdc4",
    startAt: new Date("2023-07-01T00:00:00Z"),
  });
  console.log(result);
}

async function main() {
  await maccsChargeShortfall();
}

main().catch(console.error);
