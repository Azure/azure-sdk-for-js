// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to query the usage data for scope defined.
 *
 * @summary query the usage data for scope defined.
 * x-ms-original-file: 2025-03-01/BillingAccountQuery.json
 */
async function billingAccountQueryLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.query.usage("providers/Microsoft.Billing/billingAccounts/70664866", {
    type: "Usage",
    dataset: {
      filter: {
        and: [
          {
            or: [
              {
                dimensions: {
                  name: "ResourceLocation",
                  operator: "In",
                  values: ["East US", "West Europe"],
                },
              },
              { tags: { name: "Environment", operator: "In", values: ["UAT", "Prod"] } },
            ],
          },
          { dimensions: { name: "ResourceGroup", operator: "In", values: ["API"] } },
        ],
      },
      granularity: "Daily",
    },
    timeframe: "MonthToDate",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to query the usage data for scope defined.
 *
 * @summary query the usage data for scope defined.
 * x-ms-original-file: 2025-03-01/BillingAccountQueryGrouping.json
 */
async function billingAccountQueryGroupingLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.query.usage("providers/Microsoft.Billing/billingAccounts/70664866", {
    type: "Usage",
    dataset: {
      aggregation: { totalCost: { name: "PreTaxCost", function: "Sum" } },
      granularity: "None",
      grouping: [{ name: "ResourceGroup", type: "Dimension" }],
    },
    timeframe: "TheLastMonth",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to query the usage data for scope defined.
 *
 * @summary query the usage data for scope defined.
 * x-ms-original-file: 2025-03-01/DepartmentQuery.json
 */
async function departmentQueryLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.query.usage(
    "providers/Microsoft.Billing/billingAccounts/100/departments/123",
    {
      type: "Usage",
      dataset: {
        filter: {
          and: [
            {
              or: [
                {
                  dimensions: {
                    name: "ResourceLocation",
                    operator: "In",
                    values: ["East US", "West Europe"],
                  },
                },
                { tags: { name: "Environment", operator: "In", values: ["UAT", "Prod"] } },
              ],
            },
            { dimensions: { name: "ResourceGroup", operator: "In", values: ["API"] } },
          ],
        },
        granularity: "Daily",
      },
      timeframe: "MonthToDate",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to query the usage data for scope defined.
 *
 * @summary query the usage data for scope defined.
 * x-ms-original-file: 2025-03-01/DepartmentQueryGrouping.json
 */
async function departmentQueryGroupingLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.query.usage(
    "providers/Microsoft.Billing/billingAccounts/100/departments/123",
    {
      type: "Usage",
      dataset: {
        aggregation: { totalCost: { name: "PreTaxCost", function: "Sum" } },
        granularity: "None",
        grouping: [{ name: "ResourceGroup", type: "Dimension" }],
      },
      timeframe: "TheLastMonth",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to query the usage data for scope defined.
 *
 * @summary query the usage data for scope defined.
 * x-ms-original-file: 2025-03-01/EnrollmentAccountQuery.json
 */
async function enrollmentAccountQueryLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.query.usage(
    "providers/Microsoft.Billing/billingAccounts/100/enrollmentAccounts/456",
    {
      type: "Usage",
      dataset: {
        filter: {
          and: [
            {
              or: [
                {
                  dimensions: {
                    name: "ResourceLocation",
                    operator: "In",
                    values: ["East US", "West Europe"],
                  },
                },
                { tags: { name: "Environment", operator: "In", values: ["UAT", "Prod"] } },
              ],
            },
            { dimensions: { name: "ResourceGroup", operator: "In", values: ["API"] } },
          ],
        },
        granularity: "Daily",
      },
      timeframe: "MonthToDate",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to query the usage data for scope defined.
 *
 * @summary query the usage data for scope defined.
 * x-ms-original-file: 2025-03-01/EnrollmentAccountQueryGrouping.json
 */
async function enrollmentAccountQueryGroupingLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.query.usage(
    "providers/Microsoft.Billing/billingAccounts/100/enrollmentAccounts/456",
    {
      type: "Usage",
      dataset: {
        aggregation: { totalCost: { name: "PreTaxCost", function: "Sum" } },
        granularity: "Daily",
        grouping: [{ name: "ResourceGroup", type: "Dimension" }],
      },
      timeframe: "TheLastMonth",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to query the usage data for scope defined.
 *
 * @summary query the usage data for scope defined.
 * x-ms-original-file: 2025-03-01/MCABillingAccountQuery.json
 */
async function billingAccountQueryMCA(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.query.usage(
    "providers/Microsoft.Billing/billingAccounts/12345:6789",
    {
      type: "Usage",
      dataset: {
        filter: {
          and: [
            {
              or: [
                {
                  dimensions: {
                    name: "ResourceLocation",
                    operator: "In",
                    values: ["East US", "West Europe"],
                  },
                },
                { tags: { name: "Environment", operator: "In", values: ["UAT", "Prod"] } },
              ],
            },
            { dimensions: { name: "ResourceGroup", operator: "In", values: ["API"] } },
          ],
        },
        granularity: "Daily",
      },
      timeframe: "MonthToDate",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to query the usage data for scope defined.
 *
 * @summary query the usage data for scope defined.
 * x-ms-original-file: 2025-03-01/MCABillingAccountQueryGrouping.json
 */
async function billingAccountQueryGroupingMCA(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.query.usage(
    "providers/Microsoft.Billing/billingAccounts/12345:6789",
    {
      type: "Usage",
      dataset: {
        aggregation: { totalCost: { name: "PreTaxCost", function: "Sum" } },
        granularity: "None",
        grouping: [{ name: "ResourceGroup", type: "Dimension" }],
      },
      timeframe: "TheLastMonth",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to query the usage data for scope defined.
 *
 * @summary query the usage data for scope defined.
 * x-ms-original-file: 2025-03-01/MCABillingProfileQuery.json
 */
async function billingProfileQueryMCA(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.query.usage(
    "providers/Microsoft.Billing/billingAccounts/12345:6789/billingProfiles/13579",
    {
      type: "Usage",
      dataset: {
        filter: {
          and: [
            {
              or: [
                {
                  dimensions: {
                    name: "ResourceLocation",
                    operator: "In",
                    values: ["East US", "West Europe"],
                  },
                },
                { tags: { name: "Environment", operator: "In", values: ["UAT", "Prod"] } },
              ],
            },
            { dimensions: { name: "ResourceGroup", operator: "In", values: ["API"] } },
          ],
        },
        granularity: "Daily",
      },
      timeframe: "MonthToDate",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to query the usage data for scope defined.
 *
 * @summary query the usage data for scope defined.
 * x-ms-original-file: 2025-03-01/MCABillingProfileQueryGrouping.json
 */
async function billingProfileQueryGroupingMCA(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.query.usage(
    "providers/Microsoft.Billing/billingAccounts/12345:6789/billingProfiles/13579",
    {
      type: "Usage",
      dataset: {
        aggregation: { totalCost: { name: "PreTaxCost", function: "Sum" } },
        granularity: "None",
        grouping: [{ name: "ResourceGroup", type: "Dimension" }],
      },
      timeframe: "TheLastMonth",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to query the usage data for scope defined.
 *
 * @summary query the usage data for scope defined.
 * x-ms-original-file: 2025-03-01/MCACustomerQuery.json
 */
async function customerQueryMCA(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.query.usage(
    "providers/Microsoft.Billing/billingAccounts/12345:6789/customers/5678",
    {
      type: "Usage",
      dataset: {
        filter: {
          and: [
            {
              or: [
                {
                  dimensions: {
                    name: "ResourceLocation",
                    operator: "In",
                    values: ["East US", "West Europe"],
                  },
                },
                { tags: { name: "Environment", operator: "In", values: ["UAT", "Prod"] } },
              ],
            },
            { dimensions: { name: "ResourceGroup", operator: "In", values: ["API"] } },
          ],
        },
        granularity: "Daily",
      },
      timeframe: "MonthToDate",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to query the usage data for scope defined.
 *
 * @summary query the usage data for scope defined.
 * x-ms-original-file: 2025-03-01/MCACustomerQueryGrouping.json
 */
async function customerQueryGroupingMCA(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.query.usage(
    "providers/Microsoft.Billing/billingAccounts/12345:6789/customers/5678",
    {
      type: "Usage",
      dataset: {
        aggregation: { totalCost: { name: "PreTaxCost", function: "Sum" } },
        granularity: "None",
        grouping: [{ name: "ResourceGroup", type: "Dimension" }],
      },
      timeframe: "TheLastMonth",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to query the usage data for scope defined.
 *
 * @summary query the usage data for scope defined.
 * x-ms-original-file: 2025-03-01/MCAInvoiceSectionQuery.json
 */
async function invoiceSectionQueryMCA(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.query.usage(
    "providers/Microsoft.Billing/billingAccounts/12345:6789/billingProfiles/13579/invoiceSections/9876",
    {
      type: "Usage",
      dataset: {
        filter: {
          and: [
            {
              or: [
                {
                  dimensions: {
                    name: "ResourceLocation",
                    operator: "In",
                    values: ["East US", "West Europe"],
                  },
                },
                { tags: { name: "Environment", operator: "In", values: ["UAT", "Prod"] } },
              ],
            },
            { dimensions: { name: "ResourceGroup", operator: "In", values: ["API"] } },
          ],
        },
        granularity: "Daily",
      },
      timeframe: "MonthToDate",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to query the usage data for scope defined.
 *
 * @summary query the usage data for scope defined.
 * x-ms-original-file: 2025-03-01/MCAInvoiceSectionQueryGrouping.json
 */
async function invoiceSectionQueryGroupingMCA(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.query.usage(
    "providers/Microsoft.Billing/billingAccounts/12345:6789/billingProfiles/13579/invoiceSections/9876",
    {
      type: "Usage",
      dataset: {
        aggregation: { totalCost: { name: "PreTaxCost", function: "Sum" } },
        granularity: "None",
        grouping: [{ name: "ResourceGroup", type: "Dimension" }],
      },
      timeframe: "TheLastMonth",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to query the usage data for scope defined.
 *
 * @summary query the usage data for scope defined.
 * x-ms-original-file: 2025-03-01/ManagementGroupQuery.json
 */
async function managementGroupQueryLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.query.usage(
    "providers/Microsoft.Management/managementGroups/MyMgId",
    {
      type: "Usage",
      dataset: {
        filter: {
          and: [
            {
              or: [
                {
                  dimensions: {
                    name: "ResourceLocation",
                    operator: "In",
                    values: ["East US", "West Europe"],
                  },
                },
                { tags: { name: "Environment", operator: "In", values: ["UAT", "Prod"] } },
              ],
            },
            { dimensions: { name: "ResourceGroup", operator: "In", values: ["API"] } },
          ],
        },
        granularity: "Daily",
      },
      timeframe: "MonthToDate",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to query the usage data for scope defined.
 *
 * @summary query the usage data for scope defined.
 * x-ms-original-file: 2025-03-01/ManagementGroupQueryGrouping.json
 */
async function managementGroupQueryGroupingLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.query.usage(
    "providers/Microsoft.Management/managementGroups/MyMgId",
    {
      type: "Usage",
      dataset: {
        aggregation: { totalCost: { name: "PreTaxCost", function: "Sum" } },
        granularity: "None",
        grouping: [{ name: "ResourceGroup", type: "Dimension" }],
      },
      timeframe: "TheLastMonth",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to query the usage data for scope defined.
 *
 * @summary query the usage data for scope defined.
 * x-ms-original-file: 2025-03-01/ResourceGroupQuery.json
 */
async function resourceGroupQueryLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.query.usage(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/ScreenSharingTest-peer",
    {
      type: "Usage",
      dataset: {
        filter: {
          and: [
            {
              or: [
                {
                  dimensions: {
                    name: "ResourceLocation",
                    operator: "In",
                    values: ["East US", "West Europe"],
                  },
                },
                { tags: { name: "Environment", operator: "In", values: ["UAT", "Prod"] } },
              ],
            },
            { dimensions: { name: "ResourceGroup", operator: "In", values: ["API"] } },
          ],
        },
        granularity: "Daily",
      },
      timeframe: "MonthToDate",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to query the usage data for scope defined.
 *
 * @summary query the usage data for scope defined.
 * x-ms-original-file: 2025-03-01/ResourceGroupQueryGrouping.json
 */
async function resourceGroupQueryGroupingLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.query.usage(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/ScreenSharingTest-peer",
    {
      type: "Usage",
      dataset: {
        aggregation: { totalCost: { name: "PreTaxCost", function: "Sum" } },
        granularity: "Daily",
        grouping: [{ name: "ResourceType", type: "Dimension" }],
      },
      timeframe: "TheLastMonth",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to query the usage data for scope defined.
 *
 * @summary query the usage data for scope defined.
 * x-ms-original-file: 2025-03-01/SubscriptionQuery.json
 */
async function subscriptionQueryLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.query.usage("subscriptions/00000000-0000-0000-0000-000000000000", {
    type: "Usage",
    dataset: {
      filter: {
        and: [
          {
            or: [
              {
                dimensions: {
                  name: "ResourceLocation",
                  operator: "In",
                  values: ["East US", "West Europe"],
                },
              },
              { tags: { name: "Environment", operator: "In", values: ["UAT", "Prod"] } },
            ],
          },
          { dimensions: { name: "ResourceGroup", operator: "In", values: ["API"] } },
        ],
      },
      granularity: "Daily",
    },
    timeframe: "MonthToDate",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to query the usage data for scope defined.
 *
 * @summary query the usage data for scope defined.
 * x-ms-original-file: 2025-03-01/SubscriptionQueryGrouping.json
 */
async function subscriptionQueryGroupingLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.query.usage("subscriptions/00000000-0000-0000-0000-000000000000", {
    type: "Usage",
    dataset: {
      aggregation: { totalCost: { name: "PreTaxCost", function: "Sum" } },
      granularity: "None",
      grouping: [{ name: "ResourceGroup", type: "Dimension" }],
    },
    timeframe: "TheLastMonth",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await billingAccountQueryLegacy();
  await billingAccountQueryGroupingLegacy();
  await departmentQueryLegacy();
  await departmentQueryGroupingLegacy();
  await enrollmentAccountQueryLegacy();
  await enrollmentAccountQueryGroupingLegacy();
  await billingAccountQueryMCA();
  await billingAccountQueryGroupingMCA();
  await billingProfileQueryMCA();
  await billingProfileQueryGroupingMCA();
  await customerQueryMCA();
  await customerQueryGroupingMCA();
  await invoiceSectionQueryMCA();
  await invoiceSectionQueryGroupingMCA();
  await managementGroupQueryLegacy();
  await managementGroupQueryGroupingLegacy();
  await resourceGroupQueryLegacy();
  await resourceGroupQueryGroupingLegacy();
  await subscriptionQueryLegacy();
  await subscriptionQueryGroupingLegacy();
}

main().catch(console.error);
