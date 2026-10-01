// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to get the export for the defined scope by export name.
 *
 * @summary the operation to get the export for the defined scope by export name.
 * x-ms-original-file: 2025-03-01/ExportGetByBillingAccount.json
 */
async function exportGetByBillingAccount() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.get(
    "providers/Microsoft.Billing/billingAccounts/123456",
    "TestExport",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to get the export for the defined scope by export name.
 *
 * @summary the operation to get the export for the defined scope by export name.
 * x-ms-original-file: 2025-03-01/ExportGetByDepartment.json
 */
async function exportGetByDepartment() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.get(
    "providers/Microsoft.Billing/billingAccounts/12/departments/1234",
    "TestExport",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to get the export for the defined scope by export name.
 *
 * @summary the operation to get the export for the defined scope by export name.
 * x-ms-original-file: 2025-03-01/ExportGetByEnrollmentAccount.json
 */
async function exportGetByEnrollmentAccount() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.get(
    "providers/Microsoft.Billing/billingAccounts/100/enrollmentAccounts/456",
    "TestExport",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to get the export for the defined scope by export name.
 *
 * @summary the operation to get the export for the defined scope by export name.
 * x-ms-original-file: 2025-03-01/ExportGetByManagementGroup.json
 */
async function exportGetByManagementGroup() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.get(
    "providers/Microsoft.Management/managementGroups/TestMG",
    "TestExport",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to get the export for the defined scope by export name.
 *
 * @summary the operation to get the export for the defined scope by export name.
 * x-ms-original-file: 2025-03-01/ExportGetByResourceGroup.json
 */
async function exportGetByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.get(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG",
    "TestExport",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to get the export for the defined scope by export name.
 *
 * @summary the operation to get the export for the defined scope by export name.
 * x-ms-original-file: 2025-03-01/ExportGetBySubscription.json
 */
async function exportGetBySubscription() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.get(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    "TestExport",
  );
  console.log(result);
}

async function main() {
  await exportGetByBillingAccount();
  await exportGetByDepartment();
  await exportGetByEnrollmentAccount();
  await exportGetByManagementGroup();
  await exportGetByResourceGroup();
  await exportGetBySubscription();
}

main().catch(console.error);
