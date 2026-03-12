// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 *
 * @summary The operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/ExportCreateOrUpdateByBillingAccount.json
 */

import type { Export } from "@azure/arm-costmanagement";
import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function exportCreateOrUpdateByBillingAccount(): Promise<void> {
  const scope = "providers/Microsoft.Billing/billingAccounts/123456";
  const exportName = "TestExport";
  const parameters: Export = {
    format: "Csv",
    definition: {
      type: "ActualCost",
      dataSet: {
        configuration: {
          columns: ["Date", "MeterId", "ResourceId", "ResourceLocation", "Quantity"],
        },
        granularity: "Daily",
      },
      timeframe: "MonthToDate",
    },
    deliveryInfo: {
      destination: {
        container: "exports",
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG/providers/Microsoft.Storage/storageAccounts/ccmeastusdiag182",
        rootFolderPath: "ad-hoc",
      },
    },
    schedule: {
      recurrence: "Weekly",
      recurrencePeriod: {
        from: new Date("2020-06-01T00:00:00Z"),
        to: new Date("2020-10-31T00:00:00Z"),
      },
      status: "Active",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.createOrUpdate(scope, exportName, parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to The operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 *
 * @summary The operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/ExportCreateOrUpdateByDepartment.json
 */
async function exportCreateOrUpdateByDepartment(): Promise<void> {
  const scope = "providers/Microsoft.Billing/billingAccounts/12/departments/1234";
  const exportName = "TestExport";
  const parameters: Export = {
    format: "Csv",
    definition: {
      type: "ActualCost",
      dataSet: {
        configuration: {
          columns: ["Date", "MeterId", "ResourceId", "ResourceLocation", "Quantity"],
        },
        granularity: "Daily",
      },
      timeframe: "MonthToDate",
    },
    deliveryInfo: {
      destination: {
        container: "exports",
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG/providers/Microsoft.Storage/storageAccounts/ccmeastusdiag182",
        rootFolderPath: "ad-hoc",
      },
    },
    schedule: {
      recurrence: "Weekly",
      recurrencePeriod: {
        from: new Date("2020-06-01T00:00:00Z"),
        to: new Date("2020-10-31T00:00:00Z"),
      },
      status: "Active",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.createOrUpdate(scope, exportName, parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to The operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 *
 * @summary The operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/ExportCreateOrUpdateByEnrollmentAccount.json
 */
async function exportCreateOrUpdateByEnrollmentAccount(): Promise<void> {
  const scope = "providers/Microsoft.Billing/billingAccounts/100/enrollmentAccounts/456";
  const exportName = "TestExport";
  const parameters: Export = {
    format: "Csv",
    definition: {
      type: "ActualCost",
      dataSet: {
        configuration: {
          columns: ["Date", "MeterId", "ResourceId", "ResourceLocation", "Quantity"],
        },
        granularity: "Daily",
      },
      timeframe: "MonthToDate",
    },
    deliveryInfo: {
      destination: {
        container: "exports",
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG/providers/Microsoft.Storage/storageAccounts/ccmeastusdiag182",
        rootFolderPath: "ad-hoc",
      },
    },
    schedule: {
      recurrence: "Weekly",
      recurrencePeriod: {
        from: new Date("2020-06-01T00:00:00Z"),
        to: new Date("2020-10-31T00:00:00Z"),
      },
      status: "Active",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.createOrUpdate(scope, exportName, parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to The operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 *
 * @summary The operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/ExportCreateOrUpdateByManagementGroup.json
 */
async function exportCreateOrUpdateByManagementGroup(): Promise<void> {
  const scope = "providers/Microsoft.Management/managementGroups/TestMG";
  const exportName = "TestExport";
  const parameters: Export = {
    format: "Csv",
    definition: {
      type: "ActualCost",
      dataSet: {
        configuration: {
          columns: ["Date", "MeterId", "ResourceId", "ResourceLocation", "Quantity"],
        },
        granularity: "Daily",
      },
      timeframe: "MonthToDate",
    },
    deliveryInfo: {
      destination: {
        container: "exports",
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG/providers/Microsoft.Storage/storageAccounts/ccmeastusdiag182",
        rootFolderPath: "ad-hoc",
      },
    },
    schedule: {
      recurrence: "Weekly",
      recurrencePeriod: {
        from: new Date("2020-06-01T00:00:00Z"),
        to: new Date("2020-10-31T00:00:00Z"),
      },
      status: "Active",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.createOrUpdate(scope, exportName, parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to The operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 *
 * @summary The operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/ExportCreateOrUpdateByResourceGroup.json
 */
async function exportCreateOrUpdateByResourceGroup(): Promise<void> {
  const scope = "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG";
  const exportName = "TestExport";
  const parameters: Export = {
    format: "Csv",
    definition: {
      type: "ActualCost",
      dataSet: {
        configuration: {
          columns: ["Date", "MeterId", "ResourceId", "ResourceLocation", "Quantity"],
        },
        granularity: "Daily",
      },
      timeframe: "MonthToDate",
    },
    deliveryInfo: {
      destination: {
        container: "exports",
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG/providers/Microsoft.Storage/storageAccounts/ccmeastusdiag182",
        rootFolderPath: "ad-hoc",
      },
    },
    schedule: {
      recurrence: "Weekly",
      recurrencePeriod: {
        from: new Date("2020-06-01T00:00:00Z"),
        to: new Date("2020-10-31T00:00:00Z"),
      },
      status: "Active",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.createOrUpdate(scope, exportName, parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to The operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 *
 * @summary The operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/ExportCreateOrUpdateBySubscription.json
 */
async function exportCreateOrUpdateBySubscription(): Promise<void> {
  const scope = "subscriptions/00000000-0000-0000-0000-000000000000";
  const exportName = "TestExport";
  const parameters: Export = {
    format: "Csv",
    definition: {
      type: "ActualCost",
      dataSet: {
        configuration: {
          columns: ["Date", "MeterId", "ResourceId", "ResourceLocation", "Quantity"],
        },
        granularity: "Daily",
      },
      timeframe: "MonthToDate",
    },
    deliveryInfo: {
      destination: {
        container: "exports",
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG/providers/Microsoft.Storage/storageAccounts/ccmeastusdiag182",
        rootFolderPath: "ad-hoc",
      },
    },
    schedule: {
      recurrence: "Weekly",
      recurrencePeriod: {
        from: new Date("2020-06-01T00:00:00Z"),
        to: new Date("2020-10-31T00:00:00Z"),
      },
      status: "Active",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.exports.createOrUpdate(scope, exportName, parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await exportCreateOrUpdateByBillingAccount();
  await exportCreateOrUpdateByDepartment();
  await exportCreateOrUpdateByEnrollmentAccount();
  await exportCreateOrUpdateByManagementGroup();
  await exportCreateOrUpdateByResourceGroup();
  await exportCreateOrUpdateBySubscription();
}

main().catch(console.error);
