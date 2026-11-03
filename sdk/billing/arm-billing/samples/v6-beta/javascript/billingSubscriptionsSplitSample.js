// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to splits a subscription into a new subscription with quantity less than current subscription quantity and not equal to 0.
 *
 * @summary splits a subscription into a new subscription with quantity less than current subscription quantity and not equal to 0.
 * x-ms-original-file: 2024-04-01/billingSubscriptionsSplit.json
 */
async function billingSubscriptionsSplit() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingSubscriptions.split(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "11111111-1111-1111-1111-111111111111",
    {
      billingFrequency: "P1M",
      quantity: 1,
      targetProductTypeId: "XYZ56789",
      targetSkuId: "0001",
      termDuration: "P1M",
    },
  );
  console.log(result);
}

async function main() {
  await billingSubscriptionsSplit();
}

main().catch(console.error);
