// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the subscriptions for an enrollment account. The operation is supported for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary lists the subscriptions for an enrollment account. The operation is supported for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: 2024-04-01/billingSubscriptionsListByEnrollmentAccount.json
 */
async function billingSubscriptionsListByEnrollmentAccount() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingSubscriptions.listByEnrollmentAccount(
    "6564892",
    "172988",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await billingSubscriptionsListByEnrollmentAccount();
}

main().catch(console.error);
