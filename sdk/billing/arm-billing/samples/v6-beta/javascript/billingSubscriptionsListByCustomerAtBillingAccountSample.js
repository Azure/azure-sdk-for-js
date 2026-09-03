// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the subscriptions for a customer at billing account level. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement.
 *
 * @summary lists the subscriptions for a customer at billing account level. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement.
 * x-ms-original-file: 2024-04-01/billingSubscriptionsListByCustomerAtBillingAccount.json
 */
async function billingSubscriptionsListByCustomerAtBillingAccount() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingSubscriptions.listByCustomerAtBillingAccount(
    "a1a9c77e-4cec-4a6c-a089-867d973a6074:a80d3b1f-c626-4e5e-82ed-1173bd91c838_2019-05-31",
    "Q7GV-UUVA-PJA-TGB",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await billingSubscriptionsListByCustomerAtBillingAccount();
}

main().catch(console.error);
