// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to get the run history of an export for the defined scope and export name.
 *
 * @summary the operation to get the run history of an export for the defined scope and export name.
 * x-ms-original-file: 2025-03-01/ExportRunHistoryGetByBillingAccount.json
 */
async function exportRunHistoryGetByBillingAccount() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.getExecutionHistory(
    "providers/Microsoft.Billing/billingAccounts/123456",
    "TestExport",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to get the run history of an export for the defined scope and export name.
 *
 * @summary the operation to get the run history of an export for the defined scope and export name.
 * x-ms-original-file: 2025-03-01/ExportRunHistoryGetByDepartment.json
 */
async function exportRunHistoryGetByDepartment() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.getExecutionHistory(
    "providers/Microsoft.Billing/billingAccounts/12/departments/1234",
    "TestExport",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to get the run history of an export for the defined scope and export name.
 *
 * @summary the operation to get the run history of an export for the defined scope and export name.
 * x-ms-original-file: 2025-03-01/ExportRunHistoryGetByEnrollmentAccount.json
 */
async function exportRunHistoryGetByEnrollmentAccount() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.getExecutionHistory(
    "providers/Microsoft.Billing/billingAccounts/100/enrollmentAccounts/456",
    "TestExport",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to get the run history of an export for the defined scope and export name.
 *
 * @summary the operation to get the run history of an export for the defined scope and export name.
 * x-ms-original-file: 2025-03-01/ExportRunHistoryGetByManagementGroup.json
 */
async function exportRunHistoryGetByManagementGroup() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.getExecutionHistory(
    "providers/Microsoft.Management/managementGroups/TestMG",
    "TestExport",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to get the run history of an export for the defined scope and export name.
 *
 * @summary the operation to get the run history of an export for the defined scope and export name.
 * x-ms-original-file: 2025-03-01/ExportRunHistoryGetByResourceGroup.json
 */
async function exportRunHistoryGetByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.getExecutionHistory(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG",
    "TestExport",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to get the run history of an export for the defined scope and export name.
 *
 * @summary the operation to get the run history of an export for the defined scope and export name.
 * x-ms-original-file: 2025-03-01/ExportRunHistoryGetBySubscription.json
 */
async function exportRunHistoryGetBySubscription() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.getExecutionHistory(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    "TestExport",
  );
  console.log(result);
}

async function main() {
  await exportRunHistoryGetByBillingAccount();
  await exportRunHistoryGetByDepartment();
  await exportRunHistoryGetByEnrollmentAccount();
  await exportRunHistoryGetByManagementGroup();
  await exportRunHistoryGetByResourceGroup();
  await exportRunHistoryGetBySubscription();
}

main().catch(console.error);
