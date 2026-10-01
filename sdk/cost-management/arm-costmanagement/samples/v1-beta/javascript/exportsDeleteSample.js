// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to delete a export.
 *
 * @summary the operation to delete a export.
 * x-ms-original-file: 2025-03-01/ExportDeleteByBillingAccount.json
 */
async function exportDeleteByBillingAccount() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  await client.exports.delete("providers/Microsoft.Billing/billingAccounts/123456", "TestExport");
}

/**
 * This sample demonstrates how to the operation to delete a export.
 *
 * @summary the operation to delete a export.
 * x-ms-original-file: 2025-03-01/ExportDeleteByDepartment.json
 */
async function exportDeleteByDepartment() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  await client.exports.delete(
    "providers/Microsoft.Billing/billingAccounts/12/departments/1234",
    "TestExport",
  );
}

/**
 * This sample demonstrates how to the operation to delete a export.
 *
 * @summary the operation to delete a export.
 * x-ms-original-file: 2025-03-01/ExportDeleteByEnrollmentAccount.json
 */
async function exportDeleteByEnrollmentAccount() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  await client.exports.delete(
    "providers/Microsoft.Billing/billingAccounts/100/enrollmentAccounts/456",
    "TestExport",
  );
}

/**
 * This sample demonstrates how to the operation to delete a export.
 *
 * @summary the operation to delete a export.
 * x-ms-original-file: 2025-03-01/ExportDeleteByManagementGroup.json
 */
async function exportDeleteByManagementGroup() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  await client.exports.delete(
    "providers/Microsoft.Management/managementGroups/TestMG",
    "TestExport",
  );
}

/**
 * This sample demonstrates how to the operation to delete a export.
 *
 * @summary the operation to delete a export.
 * x-ms-original-file: 2025-03-01/ExportDeleteByResourceGroup.json
 */
async function exportDeleteByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  await client.exports.delete(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG",
    "TestExport",
  );
}

/**
 * This sample demonstrates how to the operation to delete a export.
 *
 * @summary the operation to delete a export.
 * x-ms-original-file: 2025-03-01/ExportDeleteBySubscription.json
 */
async function exportDeleteBySubscription() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  await client.exports.delete("subscriptions/00000000-0000-0000-0000-000000000000", "TestExport");
}

async function main() {
  await exportDeleteByBillingAccount();
  await exportDeleteByDepartment();
  await exportDeleteByEnrollmentAccount();
  await exportDeleteByManagementGroup();
  await exportDeleteByResourceGroup();
  await exportDeleteBySubscription();
}

main().catch(console.error);
