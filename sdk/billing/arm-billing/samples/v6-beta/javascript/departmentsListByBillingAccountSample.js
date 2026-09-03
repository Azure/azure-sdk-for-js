// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the departments that a user has access to. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary lists the departments that a user has access to. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: 2024-04-01/departmentsListByBillingAccount.json
 */
async function departmentsListByBillingAccount() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.departments.listByBillingAccount("456598")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await departmentsListByBillingAccount();
}

main().catch(console.error);
