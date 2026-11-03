// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the role assignments for the caller on a department. The operation is supported for billing accounts of type Enterprise Agreement.
 *
 * @summary lists the role assignments for the caller on a department. The operation is supported for billing accounts of type Enterprise Agreement.
 * x-ms-original-file: 2024-04-01/billingRoleAssignmentListByDepartment.json
 */
async function billingRoleAssignmentListByDepartment() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingRoleAssignments.listByDepartment(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2018-09-30",
    "12345",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await billingRoleAssignmentListByDepartment();
}

main().catch(console.error);
