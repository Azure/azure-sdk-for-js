// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 *
 * @summary the operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 * x-ms-original-file: 2025-03-01/ExportCreateOrUpdateByBillingAccount.json
 */
async function exportCreateOrUpdateByBillingAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.createOrUpdate(
    "providers/Microsoft.Billing/billingAccounts/123456",
    "TestExport",
    {
      identity: { type: "SystemAssigned" },
      location: "centralus",
      format: "Csv",
      compressionMode: "gzip",
      dataOverwriteBehavior: "OverwritePreviousReport",
      definition: {
        type: "ActualCost",
        dataSet: { configuration: { dataVersion: "2023-05-01" }, granularity: "Daily" },
        timeframe: "MonthToDate",
      },
      deliveryInfo: {
        destination: {
          type: "AzureBlob",
          container: "exports",
          resourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG/providers/Microsoft.Storage/storageAccounts/ccmeastusdiag182",
          rootFolderPath: "ad-hoc",
        },
      },
      exportDescription: "This is a test export.",
      partitionData: true,
      schedule: {
        recurrence: "Daily",
        recurrencePeriod: {
          from: new Date("2020-06-01T00:00:00Z"),
          to: new Date("2020-06-30T00:00:00Z"),
        },
        status: "Active",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 *
 * @summary the operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 * x-ms-original-file: 2025-03-01/ExportCreateOrUpdateByBillingAccountCustom.json
 */
async function exportCreateOrUpdateByBillingAccountCustom(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.createOrUpdate(
    "providers/Microsoft.Billing/billingAccounts/123456",
    "TestExport",
    {
      identity: { type: "SystemAssigned" },
      location: "centralus",
      format: "Csv",
      compressionMode: "gzip",
      dataOverwriteBehavior: "OverwritePreviousReport",
      definition: {
        type: "ActualCost",
        dataSet: { configuration: { dataVersion: "2023-05-01" }, granularity: "Daily" },
        timePeriod: {
          from: new Date("2025-04-03T00:00:00.000Z"),
          to: new Date("2025-04-03T00:00:00.000Z"),
        },
        timeframe: "Custom",
      },
      deliveryInfo: {
        destination: {
          type: "AzureBlob",
          container: "exports",
          resourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG/providers/Microsoft.Storage/storageAccounts/ccmeastusdiag182",
          rootFolderPath: "ad-hoc",
        },
      },
      exportDescription: "This is a test export.",
      partitionData: true,
      schedule: { status: "Inactive" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 *
 * @summary the operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 * x-ms-original-file: 2025-03-01/ExportCreateOrUpdateByBillingAccountMonthly.json
 */
async function exportCreateOrUpdateByBillingAccountMonthly(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.createOrUpdate(
    "providers/Microsoft.Billing/billingAccounts/123456",
    "TestExport",
    {
      identity: { type: "SystemAssigned" },
      location: "centralus",
      format: "Csv",
      compressionMode: "gzip",
      dataOverwriteBehavior: "OverwritePreviousReport",
      definition: {
        type: "ActualCost",
        dataSet: { configuration: { dataVersion: "2023-05-01" }, granularity: "Daily" },
        timeframe: "TheLastMonth",
      },
      deliveryInfo: {
        destination: {
          type: "AzureBlob",
          container: "exports",
          resourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG/providers/Microsoft.Storage/storageAccounts/ccmeastusdiag182",
          rootFolderPath: "ad-hoc",
        },
      },
      exportDescription: "This is a test export.",
      partitionData: true,
      schedule: {
        recurrence: "Monthly",
        recurrencePeriod: {
          from: new Date("2020-06-05T00:00:00Z"),
          to: new Date("2030-06-30T00:00:00Z"),
        },
        status: "Active",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 *
 * @summary the operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 * x-ms-original-file: 2025-03-01/ExportCreateOrUpdateByBillingAccountPricesheet.json
 */
async function exportCreateOrUpdateByBillingAccountPricesheet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.createOrUpdate(
    "providers/Microsoft.Billing/billingAccounts/123456",
    "TestExport",
    {
      identity: { type: "SystemAssigned" },
      location: "centralus",
      format: "Csv",
      compressionMode: "gzip",
      dataOverwriteBehavior: "OverwritePreviousReport",
      definition: {
        type: "PriceSheet",
        dataSet: { configuration: { dataVersion: "2023-05-01" }, granularity: "Daily" },
        timeframe: "TheCurrentMonth",
      },
      deliveryInfo: {
        destination: {
          type: "AzureBlob",
          container: "exports",
          resourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG/providers/Microsoft.Storage/storageAccounts/ccmeastusdiag182",
          rootFolderPath: "ad-hoc",
        },
      },
      exportDescription: "This is a test export.",
      partitionData: true,
      schedule: {
        recurrence: "Daily",
        recurrencePeriod: {
          from: new Date("2023-06-01T00:00:00Z"),
          to: new Date("2023-06-30T00:00:00Z"),
        },
        status: "Active",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 *
 * @summary the operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 * x-ms-original-file: 2025-03-01/ExportCreateOrUpdateByBillingAccountReservationDetails.json
 */
async function exportCreateOrUpdateByBillingAccountReservationDetails(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.createOrUpdate(
    "providers/Microsoft.Billing/billingAccounts/123456",
    "TestExport",
    {
      identity: { type: "SystemAssigned" },
      location: "centralus",
      format: "Csv",
      compressionMode: "gzip",
      dataOverwriteBehavior: "OverwritePreviousReport",
      definition: {
        type: "ReservationDetails",
        dataSet: { configuration: { dataVersion: "2023-03-01" }, granularity: "Daily" },
        timeframe: "MonthToDate",
      },
      deliveryInfo: {
        destination: {
          type: "AzureBlob",
          container: "exports",
          resourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG/providers/Microsoft.Storage/storageAccounts/ccmeastusdiag182",
          rootFolderPath: "ad-hoc",
        },
      },
      exportDescription: "This is a test export.",
      partitionData: true,
      schedule: {
        recurrence: "Daily",
        recurrencePeriod: {
          from: new Date("2023-06-01T00:00:00Z"),
          to: new Date("2023-06-30T00:00:00Z"),
        },
        status: "Active",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 *
 * @summary the operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 * x-ms-original-file: 2025-03-01/ExportCreateOrUpdateByBillingAccountReservationRecommendation.json
 */
async function exportCreateOrUpdateByBillingAccountReservationRecommendation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.createOrUpdate(
    "providers/Microsoft.Billing/billingAccounts/123456",
    "TestExport",
    {
      identity: { type: "SystemAssigned" },
      location: "centralus",
      format: "Csv",
      compressionMode: "gzip",
      dataOverwriteBehavior: "OverwritePreviousReport",
      definition: {
        type: "ReservationRecommendations",
        dataSet: {
          configuration: {
            dataVersion: "2023-05-01",
            filters: [
              { name: "ReservationScope", value: "Single" },
              { name: "ResourceType", value: "VirtualMachines" },
              { name: "LookBackPeriod", value: "Last7Days" },
            ],
          },
        },
        timeframe: "MonthToDate",
      },
      deliveryInfo: {
        destination: {
          type: "AzureBlob",
          container: "exports",
          resourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG/providers/Microsoft.Storage/storageAccounts/ccmeastusdiag182",
          rootFolderPath: "ad-hoc",
        },
      },
      exportDescription: "This is a test export.",
      partitionData: true,
      schedule: {
        recurrence: "Daily",
        recurrencePeriod: {
          from: new Date("2023-06-01T00:00:00Z"),
          to: new Date("2023-06-30T00:00:00Z"),
        },
        status: "Active",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 *
 * @summary the operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 * x-ms-original-file: 2025-03-01/ExportCreateOrUpdateByBillingAccountReservationTransactions.json
 */
async function exportCreateOrUpdateExportCreateOrUpdateByBillingAccountReservationTransactionsByBillingAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.createOrUpdate(
    "providers/Microsoft.Billing/billingAccounts/123456",
    "TestExport",
    {
      identity: { type: "SystemAssigned" },
      location: "centralus",
      format: "Csv",
      compressionMode: "gzip",
      dataOverwriteBehavior: "OverwritePreviousReport",
      definition: {
        type: "ReservationTransactions",
        dataSet: { configuration: { dataVersion: "2023-05-01" } },
        timeframe: "MonthToDate",
      },
      deliveryInfo: {
        destination: {
          type: "AzureBlob",
          container: "exports",
          resourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG/providers/Microsoft.Storage/storageAccounts/ccmeastusdiag182",
          rootFolderPath: "ad-hoc",
        },
      },
      exportDescription: "This is a test export.",
      partitionData: true,
      schedule: {
        recurrence: "Daily",
        recurrencePeriod: {
          from: new Date("2023-06-01T00:00:00Z"),
          to: new Date("2023-06-30T00:00:00Z"),
        },
        status: "Active",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 *
 * @summary the operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 * x-ms-original-file: 2025-03-01/ExportCreateOrUpdateByDepartment.json
 */
async function exportCreateOrUpdateByDepartment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.createOrUpdate(
    "providers/Microsoft.Billing/billingAccounts/12/departments/1234",
    "TestExport",
    {
      identity: { type: "SystemAssigned" },
      location: "centralus",
      format: "Parquet",
      compressionMode: "snappy",
      dataOverwriteBehavior: "OverwritePreviousReport",
      definition: {
        type: "ActualCost",
        dataSet: { configuration: { dataVersion: "2023-05-01" }, granularity: "Daily" },
        timeframe: "MonthToDate",
      },
      deliveryInfo: {
        destination: {
          type: "AzureBlob",
          container: "exports",
          resourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG/providers/Microsoft.Storage/storageAccounts/ccmeastusdiag182",
          rootFolderPath: "ad-hoc",
        },
      },
      exportDescription: "This is a test export.",
      partitionData: true,
      schedule: {
        recurrence: "Daily",
        recurrencePeriod: {
          from: new Date("2020-06-01T00:00:00Z"),
          to: new Date("2020-06-30T00:00:00Z"),
        },
        status: "Active",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 *
 * @summary the operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 * x-ms-original-file: 2025-03-01/ExportCreateOrUpdateByEnrollmentAccount.json
 */
async function exportCreateOrUpdateByEnrollmentAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.createOrUpdate(
    "providers/Microsoft.Billing/billingAccounts/100/enrollmentAccounts/456",
    "TestExport",
    {
      identity: { type: "SystemAssigned" },
      location: "centralus",
      format: "Csv",
      compressionMode: "gzip",
      dataOverwriteBehavior: "OverwritePreviousReport",
      definition: {
        type: "ActualCost",
        dataSet: { configuration: { dataVersion: "2023-05-01" }, granularity: "Daily" },
        timeframe: "MonthToDate",
      },
      deliveryInfo: {
        destination: {
          type: "AzureBlob",
          container: "exports",
          resourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG/providers/Microsoft.Storage/storageAccounts/ccmeastusdiag182",
          rootFolderPath: "ad-hoc",
        },
      },
      exportDescription: "This is a test export.",
      partitionData: true,
      schedule: {
        recurrence: "Daily",
        recurrencePeriod: {
          from: new Date("2020-06-01T00:00:00Z"),
          to: new Date("2020-06-30T00:00:00Z"),
        },
        status: "Active",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 *
 * @summary the operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 * x-ms-original-file: 2025-03-01/ExportCreateOrUpdateByManagementGroup.json
 */
async function exportCreateOrUpdateByManagementGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.createOrUpdate(
    "providers/Microsoft.Management/managementGroups/TestMG",
    "TestExport",
    {
      identity: { type: "SystemAssigned" },
      location: "centralus",
      format: "Csv",
      compressionMode: "gzip",
      dataOverwriteBehavior: "OverwritePreviousReport",
      definition: {
        type: "ActualCost",
        dataSet: { configuration: { dataVersion: "2023-05-01" }, granularity: "Daily" },
        timeframe: "MonthToDate",
      },
      deliveryInfo: {
        destination: {
          type: "AzureBlob",
          container: "exports",
          resourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG/providers/Microsoft.Storage/storageAccounts/ccmeastusdiag182",
          rootFolderPath: "ad-hoc",
        },
      },
      exportDescription: "This is a test export.",
      partitionData: true,
      schedule: {
        recurrence: "Daily",
        recurrencePeriod: {
          from: new Date("2020-06-01T00:00:00Z"),
          to: new Date("2020-06-30T00:00:00Z"),
        },
        status: "Active",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 *
 * @summary the operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 * x-ms-original-file: 2025-03-01/ExportCreateOrUpdateByResourceGroup.json
 */
async function exportCreateOrUpdateByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.createOrUpdate(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG",
    "TestExport",
    {
      identity: { type: "SystemAssigned" },
      location: "centralus",
      format: "Csv",
      compressionMode: "gzip",
      dataOverwriteBehavior: "OverwritePreviousReport",
      definition: {
        type: "ActualCost",
        dataSet: { configuration: { dataVersion: "2023-05-01" }, granularity: "Daily" },
        timeframe: "MonthToDate",
      },
      deliveryInfo: {
        destination: {
          type: "AzureBlob",
          container: "exports",
          resourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG/providers/Microsoft.Storage/storageAccounts/ccmeastusdiag182",
          rootFolderPath: "ad-hoc",
        },
      },
      exportDescription: "This is a test export.",
      partitionData: true,
      schedule: {
        recurrence: "Daily",
        recurrencePeriod: {
          from: new Date("2020-06-01T00:00:00Z"),
          to: new Date("2020-06-30T00:00:00Z"),
        },
        status: "Active",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 *
 * @summary the operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 * x-ms-original-file: 2025-03-01/ExportCreateOrUpdateBySubscription.json
 */
async function exportCreateOrUpdateBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.createOrUpdate(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    "TestExport",
    {
      identity: { type: "SystemAssigned" },
      location: "centralus",
      format: "Csv",
      compressionMode: "gzip",
      dataOverwriteBehavior: "OverwritePreviousReport",
      definition: {
        type: "ActualCost",
        dataSet: { configuration: { dataVersion: "2023-05-01" }, granularity: "Daily" },
        timeframe: "MonthToDate",
      },
      deliveryInfo: {
        destination: {
          type: "AzureBlob",
          container: "exports",
          resourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG/providers/Microsoft.Storage/storageAccounts/ccmeastusdiag182",
          rootFolderPath: "ad-hoc",
        },
      },
      exportDescription: "This is a test export.",
      partitionData: true,
      schedule: {
        recurrence: "Daily",
        recurrencePeriod: {
          from: new Date("2020-06-01T00:00:00Z"),
          to: new Date("2020-06-30T00:00:00Z"),
        },
        status: "Active",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await exportCreateOrUpdateByBillingAccount();
  await exportCreateOrUpdateByBillingAccountCustom();
  await exportCreateOrUpdateByBillingAccountMonthly();
  await exportCreateOrUpdateByBillingAccountPricesheet();
  await exportCreateOrUpdateByBillingAccountReservationDetails();
  await exportCreateOrUpdateByBillingAccountReservationRecommendation();
  await exportCreateOrUpdateExportCreateOrUpdateByBillingAccountReservationTransactionsByBillingAccount();
  await exportCreateOrUpdateByDepartment();
  await exportCreateOrUpdateByEnrollmentAccount();
  await exportCreateOrUpdateByManagementGroup();
  await exportCreateOrUpdateByResourceGroup();
  await exportCreateOrUpdateBySubscription();
}

main().catch(console.error);
