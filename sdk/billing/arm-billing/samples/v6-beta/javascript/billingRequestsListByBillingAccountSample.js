// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the list of billing requests submitted for the billing account.
 *
 * @summary the list of billing requests submitted for the billing account.
 * x-ms-original-file: 2024-04-01/billingRequestsListByBillingAccount.json
 */
async function billingRequestsListByBillingAccount() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingRequests.listByBillingAccount(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await billingRequestsListByBillingAccount();
}

main().catch(console.error);
