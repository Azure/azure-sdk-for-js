// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the list of billing requests submitted by a user.
 *
 * @summary the list of billing requests submitted by a user.
 * x-ms-original-file: 2024-04-01/billingRequestsListByUser.json
 */
async function billingRequestsListByUser() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingRequests.listByUser()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to the list of billing requests submitted by a user.
 *
 * @summary the list of billing requests submitted by a user.
 * x-ms-original-file: 2024-04-01/billingRequestsListByUserWithFilter.json
 */
async function billingRequestsListByUserWithFilter() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingRequests.listByUser({
    filter: "properties/status eq 'Approved'",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await billingRequestsListByUser();
  await billingRequestsListByUserWithFilter();
}

main().catch(console.error);
