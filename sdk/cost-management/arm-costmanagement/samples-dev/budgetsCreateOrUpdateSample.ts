// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create or update a budget. You can optionally provide an eTag if desired as a form of concurrency control. To obtain the latest eTag for a given budget, perform a get operation prior to your put operation.
 *
 * @summary the operation to create or update a budget. You can optionally provide an eTag if desired as a form of concurrency control. To obtain the latest eTag for a given budget, perform a get operation prior to your put operation.
 * x-ms-original-file: 2025-03-01/Budgets/CreateOrUpdate/Cost/CreateOrUpdate-Cost-Subscription-Budget.json
 */
async function createOrUpdateCostSubscriptionBudget(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.budgets.createOrUpdate(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    "TestBudget",
    {
      eTag: '"1d34d016a593709"',
      amount: 100.65,
      category: "Cost",
      filter: {
        and: [
          {
            dimensions: {
              name: "ResourceId",
              operator: "In",
              values: [
                "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG/providers/Microsoft.Compute/virtualMachines/MSVM2",
                "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG/providers/Microsoft.Compute/virtualMachines/platformcloudplatformGeneric1",
              ],
            },
          },
          { tags: { name: "category", operator: "In", values: ["Dev", "Prod"] } },
          { tags: { name: "department", operator: "In", values: ["engineering", "sales"] } },
        ],
      },
      notifications: {
        Actual_GreaterThan_80_Percent: {
          contactEmails: ["johndoe@contoso.com", "janesmith@contoso.com"],
          contactGroups: [
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG/providers/microsoft.insights/actionGroups/SampleActionGroup",
          ],
          contactRoles: ["Contributor", "Reader"],
          enabled: true,
          locale: "en-us",
          operator: "GreaterThan",
          threshold: 80,
          thresholdType: "Actual",
        },
      },
      timeGrain: "Monthly",
      timePeriod: {
        endDate: new Date("2024-10-31T00:00:00Z"),
        startDate: new Date("2023-04-01T00:00:00Z"),
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a budget. You can optionally provide an eTag if desired as a form of concurrency control. To obtain the latest eTag for a given budget, perform a get operation prior to your put operation.
 *
 * @summary the operation to create or update a budget. You can optionally provide an eTag if desired as a form of concurrency control. To obtain the latest eTag for a given budget, perform a get operation prior to your put operation.
 * x-ms-original-file: 2025-03-01/Budgets/CreateOrUpdate/ReservationUtilization/EA/BillingAccountEA-AlertRule-ReservationIdFilter.json
 */
async function createOrUpdateReservationUtilizationBillingAccountEAAlertRuleReservationIdFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.budgets.createOrUpdate(
    "providers/Microsoft.Billing/billingAccounts/123456",
    "TestAlertRule",
    {
      eTag: '"1d34d016a593709"',
      category: "ReservationUtilization",
      filter: {
        dimensions: {
          name: "ReservationId",
          operator: "In",
          values: [
            "00000000-0000-0000-0000-000000000000",
            "00000000-0000-0000-0000-000000000001",
            "00000000-0000-0000-0000-000000000002",
          ],
        },
      },
      notifications: {
        Actual_LessThan_99_Percent: {
          contactEmails: ["johndoe@contoso.com", "janesmith@contoso.com"],
          enabled: true,
          frequency: "Weekly",
          locale: "en-us",
          operator: "LessThan",
          threshold: 99,
        },
      },
      timeGrain: "Last7Days",
      timePeriod: {
        endDate: new Date("2025-04-01T00:00:00Z"),
        startDate: new Date("2023-04-01T00:00:00Z"),
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a budget. You can optionally provide an eTag if desired as a form of concurrency control. To obtain the latest eTag for a given budget, perform a get operation prior to your put operation.
 *
 * @summary the operation to create or update a budget. You can optionally provide an eTag if desired as a form of concurrency control. To obtain the latest eTag for a given budget, perform a get operation prior to your put operation.
 * x-ms-original-file: 2025-03-01/Budgets/CreateOrUpdate/ReservationUtilization/EA/BillingAccountEA-AlertRule-ReservedResourceTypeFilter.json
 */
async function createOrUpdateReservationUtilizationBillingAccountEAAlertRuleReservedResourceTypeFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.budgets.createOrUpdate(
    "providers/Microsoft.Billing/billingAccounts/123456",
    "TestAlertRule",
    {
      eTag: '"1d34d016a593709"',
      category: "ReservationUtilization",
      filter: {
        dimensions: {
          name: "ReservedResourceType",
          operator: "In",
          values: ["VirtualMachines", "SqlDatabases", "CosmosDb"],
        },
      },
      notifications: {
        Actual_LessThan_99_Percent: {
          contactEmails: ["johndoe@contoso.com", "janesmith@contoso.com"],
          enabled: true,
          frequency: "Weekly",
          locale: "en-us",
          operator: "LessThan",
          threshold: 99,
        },
      },
      timeGrain: "Last7Days",
      timePeriod: {
        endDate: new Date("2025-04-01T00:00:00Z"),
        startDate: new Date("2023-04-01T00:00:00Z"),
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a budget. You can optionally provide an eTag if desired as a form of concurrency control. To obtain the latest eTag for a given budget, perform a get operation prior to your put operation.
 *
 * @summary the operation to create or update a budget. You can optionally provide an eTag if desired as a form of concurrency control. To obtain the latest eTag for a given budget, perform a get operation prior to your put operation.
 * x-ms-original-file: 2025-03-01/Budgets/CreateOrUpdate/ReservationUtilization/EA/BillingAccountEA-AlertRule.json
 */
async function createOrUpdateReservationUtilizationBillingAccountEAAlertRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.budgets.createOrUpdate(
    "providers/Microsoft.Billing/billingAccounts/123456",
    "TestAlertRule",
    {
      eTag: '"1d34d016a593709"',
      category: "ReservationUtilization",
      filter: {},
      notifications: {
        Actual_LessThan_99_Percent: {
          contactEmails: ["johndoe@contoso.com", "janesmith@contoso.com"],
          enabled: true,
          frequency: "Weekly",
          locale: "en-us",
          operator: "LessThan",
          threshold: 99,
        },
      },
      timeGrain: "Last7Days",
      timePeriod: {
        endDate: new Date("2025-04-01T00:00:00Z"),
        startDate: new Date("2023-04-01T00:00:00Z"),
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a budget. You can optionally provide an eTag if desired as a form of concurrency control. To obtain the latest eTag for a given budget, perform a get operation prior to your put operation.
 *
 * @summary the operation to create or update a budget. You can optionally provide an eTag if desired as a form of concurrency control. To obtain the latest eTag for a given budget, perform a get operation prior to your put operation.
 * x-ms-original-file: 2025-03-01/Budgets/CreateOrUpdate/ReservationUtilization/MCA/BillingProfile-AlertRule-ReservationIdFilter.json
 */
async function createOrUpdateReservationUtilizationBillingProfileMCAAlertRuleReservationIdFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.budgets.createOrUpdate(
    "providers/Microsoft.Billing/billingAccounts/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee:ffffffff-gggg-hhhh-iiii-jjjjjjjjjjjj_2023-04-01/billingProfiles/KKKK-LLLL-MMM-NNN",
    "TestAlertRule",
    {
      eTag: '"1d34d016a593709"',
      category: "ReservationUtilization",
      filter: {
        dimensions: {
          name: "ReservationId",
          operator: "In",
          values: [
            "00000000-0000-0000-0000-000000000000",
            "00000000-0000-0000-0000-000000000001",
            "00000000-0000-0000-0000-000000000002",
          ],
        },
      },
      notifications: {
        Actual_LessThan_99_Percent: {
          contactEmails: ["johndoe@contoso.com", "janesmith@contoso.com"],
          enabled: true,
          frequency: "Daily",
          locale: "en-us",
          operator: "LessThan",
          threshold: 99,
        },
      },
      timeGrain: "Last30Days",
      timePeriod: {
        endDate: new Date("2025-04-01T00:00:00Z"),
        startDate: new Date("2023-04-01T00:00:00Z"),
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a budget. You can optionally provide an eTag if desired as a form of concurrency control. To obtain the latest eTag for a given budget, perform a get operation prior to your put operation.
 *
 * @summary the operation to create or update a budget. You can optionally provide an eTag if desired as a form of concurrency control. To obtain the latest eTag for a given budget, perform a get operation prior to your put operation.
 * x-ms-original-file: 2025-03-01/Budgets/CreateOrUpdate/ReservationUtilization/MCA/BillingProfile-AlertRule-ReservedResourceTypeFilter.json
 */
async function createOrUpdateReservationUtilizationBillingProfileMCAAlertRuleReservedResourceTypeFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.budgets.createOrUpdate(
    "providers/Microsoft.Billing/billingAccounts/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee:ffffffff-gggg-hhhh-iiii-jjjjjjjjjjjj_2023-04-01/billingProfiles/KKKK-LLLL-MMM-NNN",
    "TestAlertRule",
    {
      eTag: '"1d34d016a593709"',
      category: "ReservationUtilization",
      filter: {
        dimensions: {
          name: "ReservedResourceType",
          operator: "In",
          values: ["VirtualMachines", "SqlDatabases", "CosmosDb"],
        },
      },
      notifications: {
        Actual_LessThan_99_Percent: {
          contactEmails: ["johndoe@contoso.com", "janesmith@contoso.com"],
          enabled: true,
          frequency: "Daily",
          locale: "en-us",
          operator: "LessThan",
          threshold: 99,
        },
      },
      timeGrain: "Last30Days",
      timePeriod: {
        endDate: new Date("2025-04-01T00:00:00Z"),
        startDate: new Date("2023-04-01T00:00:00Z"),
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a budget. You can optionally provide an eTag if desired as a form of concurrency control. To obtain the latest eTag for a given budget, perform a get operation prior to your put operation.
 *
 * @summary the operation to create or update a budget. You can optionally provide an eTag if desired as a form of concurrency control. To obtain the latest eTag for a given budget, perform a get operation prior to your put operation.
 * x-ms-original-file: 2025-03-01/Budgets/CreateOrUpdate/ReservationUtilization/MCA/BillingProfile-AlertRule.json
 */
async function createOrUpdateReservationUtilizationBillingProfileMCAAlertRuleJson(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.budgets.createOrUpdate(
    "providers/Microsoft.Billing/billingAccounts/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee:ffffffff-gggg-hhhh-iiii-jjjjjjjjjjjj_2023-04-01/billingProfiles/KKKK-LLLL-MMM-NNN",
    "TestAlertRule",
    {
      eTag: '"1d34d016a593709"',
      category: "ReservationUtilization",
      filter: {},
      notifications: {
        Actual_LessThan_99_Percent: {
          contactEmails: ["johndoe@contoso.com", "janesmith@contoso.com"],
          enabled: true,
          frequency: "Daily",
          locale: "en-us",
          operator: "LessThan",
          threshold: 99,
        },
      },
      timeGrain: "Last30Days",
      timePeriod: {
        endDate: new Date("2025-04-01T00:00:00Z"),
        startDate: new Date("2023-04-01T00:00:00Z"),
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a budget. You can optionally provide an eTag if desired as a form of concurrency control. To obtain the latest eTag for a given budget, perform a get operation prior to your put operation.
 *
 * @summary the operation to create or update a budget. You can optionally provide an eTag if desired as a form of concurrency control. To obtain the latest eTag for a given budget, perform a get operation prior to your put operation.
 * x-ms-original-file: 2025-03-01/Budgets/CreateOrUpdate/ReservationUtilization/MCA/Customer-AlertRule-ReservationIdFilter.json
 */
async function createOrUpdateReservationUtilizationCustomerCSPAlertRuleReservationIdFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.budgets.createOrUpdate(
    "providers/Microsoft.Billing/billingAccounts/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee:ffffffff-gggg-hhhh-iiii-jjjjjjjjjjjj_2023-04-01/customers/000000-1111-2222-3333-444444444444",
    "TestAlertRule",
    {
      eTag: '"1d34d016a593709"',
      category: "ReservationUtilization",
      filter: {
        dimensions: {
          name: "ReservationId",
          operator: "In",
          values: [
            "00000000-0000-0000-0000-000000000000",
            "00000000-0000-0000-0000-000000000001",
            "00000000-0000-0000-0000-000000000002",
          ],
        },
      },
      notifications: {
        Actual_LessThan_99_Percent: {
          contactEmails: ["johndoe@contoso.com", "janesmith@contoso.com"],
          enabled: true,
          frequency: "Daily",
          locale: "en-us",
          operator: "LessThan",
          threshold: 99,
        },
      },
      timeGrain: "Last30Days",
      timePeriod: {
        endDate: new Date("2025-04-01T00:00:00Z"),
        startDate: new Date("2023-04-01T00:00:00Z"),
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a budget. You can optionally provide an eTag if desired as a form of concurrency control. To obtain the latest eTag for a given budget, perform a get operation prior to your put operation.
 *
 * @summary the operation to create or update a budget. You can optionally provide an eTag if desired as a form of concurrency control. To obtain the latest eTag for a given budget, perform a get operation prior to your put operation.
 * x-ms-original-file: 2025-03-01/Budgets/CreateOrUpdate/ReservationUtilization/MCA/Customer-AlertRule-ReservedResourceTypeFilter.json
 */
async function createOrUpdateReservationUtilizationCustomerCSPAlertRuleReservedResourceTypeFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.budgets.createOrUpdate(
    "providers/Microsoft.Billing/billingAccounts/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee:ffffffff-gggg-hhhh-iiii-jjjjjjjjjjjj_2023-04-01/customers/000000-1111-2222-3333-444444444444",
    "TestAlertRule",
    {
      eTag: '"1d34d016a593709"',
      category: "ReservationUtilization",
      filter: {
        dimensions: {
          name: "ReservedResourceType",
          operator: "In",
          values: ["VirtualMachines", "SqlDatabases", "CosmosDb"],
        },
      },
      notifications: {
        Actual_LessThan_99_Percent: {
          contactEmails: ["johndoe@contoso.com", "janesmith@contoso.com"],
          enabled: true,
          frequency: "Daily",
          locale: "en-us",
          operator: "LessThan",
          threshold: 99,
        },
      },
      timeGrain: "Last30Days",
      timePeriod: {
        endDate: new Date("2025-04-01T00:00:00Z"),
        startDate: new Date("2023-04-01T00:00:00Z"),
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a budget. You can optionally provide an eTag if desired as a form of concurrency control. To obtain the latest eTag for a given budget, perform a get operation prior to your put operation.
 *
 * @summary the operation to create or update a budget. You can optionally provide an eTag if desired as a form of concurrency control. To obtain the latest eTag for a given budget, perform a get operation prior to your put operation.
 * x-ms-original-file: 2025-03-01/Budgets/CreateOrUpdate/ReservationUtilization/MCA/Customer-AlertRule.json
 */
async function createOrUpdateReservationUtilizationCustomerCSPAlertRuleJson(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.budgets.createOrUpdate(
    "providers/Microsoft.Billing/billingAccounts/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee:ffffffff-gggg-hhhh-iiii-jjjjjjjjjjjj_2023-04-01/customers/000000-1111-2222-3333-444444444444",
    "TestAlertRule",
    {
      eTag: '"1d34d016a593709"',
      category: "ReservationUtilization",
      filter: {},
      notifications: {
        Actual_LessThan_99_Percent: {
          contactEmails: ["johndoe@contoso.com", "janesmith@contoso.com"],
          enabled: true,
          frequency: "Daily",
          locale: "en-us",
          operator: "LessThan",
          threshold: 99,
        },
      },
      timeGrain: "Last30Days",
      timePeriod: {
        endDate: new Date("2025-04-01T00:00:00Z"),
        startDate: new Date("2023-04-01T00:00:00Z"),
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateCostSubscriptionBudget();
  await createOrUpdateReservationUtilizationBillingAccountEAAlertRuleReservationIdFilter();
  await createOrUpdateReservationUtilizationBillingAccountEAAlertRuleReservedResourceTypeFilter();
  await createOrUpdateReservationUtilizationBillingAccountEAAlertRule();
  await createOrUpdateReservationUtilizationBillingProfileMCAAlertRuleReservationIdFilter();
  await createOrUpdateReservationUtilizationBillingProfileMCAAlertRuleReservedResourceTypeFilter();
  await createOrUpdateReservationUtilizationBillingProfileMCAAlertRuleJson();
  await createOrUpdateReservationUtilizationCustomerCSPAlertRuleReservationIdFilter();
  await createOrUpdateReservationUtilizationCustomerCSPAlertRuleReservedResourceTypeFilter();
  await createOrUpdateReservationUtilizationCustomerCSPAlertRuleJson();
}

main().catch(console.error);
