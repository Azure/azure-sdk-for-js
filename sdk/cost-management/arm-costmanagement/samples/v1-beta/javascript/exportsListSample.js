// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to list all exports at the given scope.
 *
 * @summary the operation to list all exports at the given scope.
 * x-ms-original-file: 2025-03-01/ExportsGetByBillingAccount.json
 */
async function exportsGetByBillingAccount() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.list("providers/Microsoft.Billing/billingAccounts/123456");
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to list all exports at the given scope.
 *
 * @summary the operation to list all exports at the given scope.
 * x-ms-original-file: 2025-03-01/ExportsGetByDepartment.json
 */
async function exportsGetByDepartment() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.list(
    "providers/Microsoft.Billing/billingAccounts/12/departments/123",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to list all exports at the given scope.
 *
 * @summary the operation to list all exports at the given scope.
 * x-ms-original-file: 2025-03-01/ExportsGetByEnrollmentAccount.json
 */
async function exportsGetByEnrollmentAccount() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.list(
    "providers/Microsoft.Billing/billingAccounts/100/enrollmentAccounts/456",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to list all exports at the given scope.
 *
 * @summary the operation to list all exports at the given scope.
 * x-ms-original-file: 2025-03-01/ExportsGetByManagementGroup.json
 */
async function exportsGetByManagementGroup() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.list(
    "providers/Microsoft.Management/managementGroups/TestMG",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to list all exports at the given scope.
 *
 * @summary the operation to list all exports at the given scope.
 * x-ms-original-file: 2025-03-01/ExportsGetByResourceGroup.json
 */
async function exportsGetByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.list(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to list all exports at the given scope.
 *
 * @summary the operation to list all exports at the given scope.
 * x-ms-original-file: 2025-03-01/ExportsGetBySubscription.json
 */
async function exportsGetBySubscription() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.list("subscriptions/00000000-0000-0000-0000-000000000000");
  console.log(result);
}

async function main() {
  await exportsGetByBillingAccount();
  await exportsGetByDepartment();
  await exportsGetByEnrollmentAccount();
  await exportsGetByManagementGroup();
  await exportsGetByResourceGroup();
  await exportsGetBySubscription();
}

main().catch(console.error);
