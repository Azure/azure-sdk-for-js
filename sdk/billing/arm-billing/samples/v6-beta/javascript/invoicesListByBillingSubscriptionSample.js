// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the invoices for a subscription. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement.
 *
 * @summary lists the invoices for a subscription. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement.
 * x-ms-original-file: 2024-04-01/invoicesListByBillingSubscription.json
 */
async function invoicesListByBillingSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BillingManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.invoices.listByBillingSubscription({
    periodStartDate: new Date("2023-01-01"),
    periodEndDate: new Date("2023-06-30"),
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await invoicesListByBillingSubscription();
}

main().catch(console.error);
