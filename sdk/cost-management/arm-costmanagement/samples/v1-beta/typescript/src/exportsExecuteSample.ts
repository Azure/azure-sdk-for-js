// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to run an export.
 *
 * @summary the operation to run an export.
 * x-ms-original-file: 2025-03-01/ExportRunByBillingAccount.json
 */
async function exportRunByBillingAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  await client.exports.execute("providers/Microsoft.Billing/billingAccounts/123456", "TestExport");
}

/**
 * This sample demonstrates how to the operation to run an export.
 *
 * @summary the operation to run an export.
 * x-ms-original-file: 2025-03-01/ExportRunByBillingAccountWithOptionalRequestBody.json
 */
async function exportRunByBillingAccountWithOptionalRequestBody(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  await client.exports.execute("providers/Microsoft.Billing/billingAccounts/123456", "TestExport");
}

/**
 * This sample demonstrates how to the operation to run an export.
 *
 * @summary the operation to run an export.
 * x-ms-original-file: 2025-03-01/ExportRunByDepartment.json
 */
async function exportRunByDepartment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  await client.exports.execute(
    "providers/Microsoft.Billing/billingAccounts/12/departments/1234",
    "TestExport",
  );
}

/**
 * This sample demonstrates how to the operation to run an export.
 *
 * @summary the operation to run an export.
 * x-ms-original-file: 2025-03-01/ExportRunByEnrollmentAccount.json
 */
async function exportRunByEnrollmentAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  await client.exports.execute(
    "providers/Microsoft.Billing/billingAccounts/100/enrollmentAccounts/456",
    "TestExport",
  );
}

/**
 * This sample demonstrates how to the operation to run an export.
 *
 * @summary the operation to run an export.
 * x-ms-original-file: 2025-03-01/ExportRunByManagementGroup.json
 */
async function exportRunByManagementGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  await client.exports.execute(
    "providers/Microsoft.Management/managementGroups/TestMG",
    "TestExport",
  );
}

/**
 * This sample demonstrates how to the operation to run an export.
 *
 * @summary the operation to run an export.
 * x-ms-original-file: 2025-03-01/ExportRunByResourceGroup.json
 */
async function exportRunByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  await client.exports.execute(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG",
    "TestExport",
  );
}

/**
 * This sample demonstrates how to the operation to run an export.
 *
 * @summary the operation to run an export.
 * x-ms-original-file: 2025-03-01/ExportRunBySubscription.json
 */
async function exportRunBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  await client.exports.execute("subscriptions/00000000-0000-0000-0000-000000000000", "TestExport");
}

async function main(): Promise<void> {
  await exportRunByBillingAccount();
  await exportRunByBillingAccountWithOptionalRequestBody();
  await exportRunByDepartment();
  await exportRunByEnrollmentAccount();
  await exportRunByManagementGroup();
  await exportRunByResourceGroup();
  await exportRunBySubscription();
}

main().catch(console.error);
