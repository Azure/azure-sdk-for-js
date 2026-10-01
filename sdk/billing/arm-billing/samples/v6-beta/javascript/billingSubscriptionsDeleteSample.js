// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancels a billing subscription. This operation is supported only for billing accounts of type Microsoft Partner Agreement or Microsoft Customer Agreement.
 *
 * @summary cancels a billing subscription. This operation is supported only for billing accounts of type Microsoft Partner Agreement or Microsoft Customer Agreement.
 * x-ms-original-file: 2024-04-01/billingSubscriptionsDelete.json
 */
async function billingSubscriptionsDelete() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  await client.billingSubscriptions.delete(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "11111111-1111-1111-1111-111111111111",
  );
}

async function main() {
  await billingSubscriptionsDelete();
}

main().catch(console.error);
