// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the properties of a billing subscription.
 *
 * @summary updates the properties of a billing subscription.
 * x-ms-original-file: 2024-04-01/billingSubscriptionsUpdate.json
 */
async function billingSubscriptionsUpdate() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingSubscriptions.update(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "11111111-1111-1111-1111-111111111111",
    { consumptionCostCenter: "ABC1234" },
  );
  console.log(result);
}

async function main() {
  await billingSubscriptionsUpdate();
}

main().catch(console.error);
