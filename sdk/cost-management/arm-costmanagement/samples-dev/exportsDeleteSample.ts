// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to delete a export.
 *
 * @summary The operation to delete a export.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/ExportDeleteByBillingAccount.json
 */

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function exportDeleteByBillingAccount(): Promise<void> {
  const scope = "providers/Microsoft.Billing/billingAccounts/123456";
  const exportName = "TestExport";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.delete(scope, exportName);
  console.log(result);
}

/**
 * This sample demonstrates how to The operation to delete a export.
 *
 * @summary The operation to delete a export.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/ExportDeleteByDepartment.json
 */
async function exportDeleteByDepartment(): Promise<void> {
  const scope = "providers/Microsoft.Billing/billingAccounts/12/departments/1234";
  const exportName = "TestExport";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.delete(scope, exportName);
  console.log(result);
}

/**
 * This sample demonstrates how to The operation to delete a export.
 *
 * @summary The operation to delete a export.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/ExportDeleteByEnrollmentAccount.json
 */
async function exportDeleteByEnrollmentAccount(): Promise<void> {
  const scope = "providers/Microsoft.Billing/billingAccounts/100/enrollmentAccounts/456";
  const exportName = "TestExport";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.delete(scope, exportName);
  console.log(result);
}

/**
 * This sample demonstrates how to The operation to delete a export.
 *
 * @summary The operation to delete a export.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/ExportDeleteByManagementGroup.json
 */
async function exportDeleteByManagementGroup(): Promise<void> {
  const scope = "providers/Microsoft.Management/managementGroups/TestMG";
  const exportName = "TestExport";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.delete(scope, exportName);
  console.log(result);
}

/**
 * This sample demonstrates how to The operation to delete a export.
 *
 * @summary The operation to delete a export.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/ExportDeleteByResourceGroup.json
 */
async function exportDeleteByResourceGroup(): Promise<void> {
  const scope = "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG";
  const exportName = "TestExport";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.delete(scope, exportName);
  console.log(result);
}

/**
 * This sample demonstrates how to The operation to delete a export.
 *
 * @summary The operation to delete a export.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/ExportDeleteBySubscription.json
 */
async function exportDeleteBySubscription(): Promise<void> {
  const scope = "subscriptions/00000000-0000-0000-0000-000000000000";
  const exportName = "TestExport";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.delete(scope, exportName);
  console.log(result);
}

async function main(): Promise<void> {
  await exportDeleteByBillingAccount();
  await exportDeleteByDepartment();
  await exportDeleteByEnrollmentAccount();
  await exportDeleteByManagementGroup();
  await exportDeleteByResourceGroup();
  await exportDeleteBySubscription();
}

main().catch(console.error);
