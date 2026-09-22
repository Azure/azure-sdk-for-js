// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the billing permissions the caller has for a department.
 *
 * @summary lists the billing permissions the caller has for a department.
 * x-ms-original-file: 2024-04-01/billingPermissionsListByDepartment.json
 */
async function billingPermissionsListByDepartment() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingPermissions.listByDepartment("6100092", "123456")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await billingPermissionsListByDepartment();
}

main().catch(console.error);
