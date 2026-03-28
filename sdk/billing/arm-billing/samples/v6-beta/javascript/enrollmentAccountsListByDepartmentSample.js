// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the enrollment accounts for a department. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary lists the enrollment accounts for a department. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: 2024-04-01/enrollmentAccountsListByDepartment.json
 */
async function enrollmentAccountsListByDepartment() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.enrollmentAccounts.listByDepartment("6564892", "164821")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await enrollmentAccountsListByDepartment();
}

main().catch(console.error);
