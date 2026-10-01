// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the forecast charges for scope defined.
 *
 * @summary lists the forecast charges for scope defined.
 * x-ms-original-file: 2025-03-01/BillingAccountForecast.json
 */
async function billingAccountForecast() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.forecast.usage(
    "providers/Microsoft.Billing/billingAccounts/12345:6789",
    {
      type: "Usage",
      dataset: {
        aggregation: { totalCost: { name: "Cost", function: "Sum" } },
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
      includeActualCost: false,
      includeFreshPartialCost: false,
      timePeriod: {
        from: new Date("2022-08-01T00:00:00+00:00"),
        to: new Date("2022-08-31T23:59:59+00:00"),
      },
      timeframe: "Custom",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to lists the forecast charges for scope defined.
 *
 * @summary lists the forecast charges for scope defined.
 * x-ms-original-file: 2025-03-01/BillingProfileForecast.json
 */
async function billingProfileForecast() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.forecast.usage(
    "providers/Microsoft.Billing/billingAccounts/12345:6789/billingProfiles/13579",
    {
      type: "Usage",
      dataset: {
        aggregation: { totalCost: { name: "Cost", function: "Sum" } },
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
      includeActualCost: false,
      includeFreshPartialCost: false,
      timePeriod: {
        from: new Date("2022-08-01T00:00:00+00:00"),
        to: new Date("2022-08-31T23:59:59+00:00"),
      },
      timeframe: "Custom",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to lists the forecast charges for scope defined.
 *
 * @summary lists the forecast charges for scope defined.
 * x-ms-original-file: 2025-03-01/DepartmentForecast.json
 */
async function departmentForecast() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.forecast.usage(
    "providers/Microsoft.Billing/billingAccounts/12345:6789/departments/123",
    {
      type: "Usage",
      dataset: {
        aggregation: { totalCost: { name: "Cost", function: "Sum" } },
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
      includeActualCost: false,
      includeFreshPartialCost: false,
      timePeriod: {
        from: new Date("2022-08-01T00:00:00+00:00"),
        to: new Date("2022-08-31T23:59:59+00:00"),
      },
      timeframe: "Custom",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to lists the forecast charges for scope defined.
 *
 * @summary lists the forecast charges for scope defined.
 * x-ms-original-file: 2025-03-01/EnrollmentAccountForecast.json
 */
async function enrollmentAccountForecast() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.forecast.usage(
    "providers/Microsoft.Billing/billingAccounts/12345:6789/enrollmentAccounts/456",
    {
      type: "Usage",
      dataset: {
        aggregation: { totalCost: { name: "Cost", function: "Sum" } },
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
      includeActualCost: false,
      includeFreshPartialCost: false,
      timePeriod: {
        from: new Date("2022-08-01T00:00:00+00:00"),
        to: new Date("2022-08-31T23:59:59+00:00"),
      },
      timeframe: "Custom",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to lists the forecast charges for scope defined.
 *
 * @summary lists the forecast charges for scope defined.
 * x-ms-original-file: 2025-03-01/InvoiceSectionForecast.json
 */
async function invoiceSectionForecast() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.forecast.usage(
    "providers/Microsoft.Billing/billingAccounts/12345:6789/billingProfiles/13579/invoiceSections/9876",
    {
      type: "Usage",
      dataset: {
        aggregation: { totalCost: { name: "Cost", function: "Sum" } },
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
      includeActualCost: false,
      includeFreshPartialCost: false,
      timePeriod: {
        from: new Date("2022-08-01T00:00:00+00:00"),
        to: new Date("2022-08-31T23:59:59+00:00"),
      },
      timeframe: "Custom",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to lists the forecast charges for scope defined.
 *
 * @summary lists the forecast charges for scope defined.
 * x-ms-original-file: 2025-03-01/ResourceGroupForecast.json
 */
async function resourceGroupForecast() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.forecast.usage(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/ScreenSharingTest-peer",
    {
      type: "Usage",
      dataset: {
        aggregation: { totalCost: { name: "Cost", function: "Sum" } },
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
      includeActualCost: false,
      includeFreshPartialCost: false,
      timePeriod: {
        from: new Date("2022-08-01T00:00:00+00:00"),
        to: new Date("2022-08-31T23:59:59+00:00"),
      },
      timeframe: "Custom",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to lists the forecast charges for scope defined.
 *
 * @summary lists the forecast charges for scope defined.
 * x-ms-original-file: 2025-03-01/SubscriptionForecast.json
 */
async function subscriptionForecast() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.forecast.usage("subscriptions/00000000-0000-0000-0000-000000000000", {
    type: "Usage",
    dataset: {
      aggregation: { totalCost: { name: "Cost", function: "Sum" } },
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
    includeActualCost: false,
    includeFreshPartialCost: false,
    timePeriod: {
      from: new Date("2022-08-01T00:00:00+00:00"),
      to: new Date("2022-08-31T23:59:59+00:00"),
    },
    timeframe: "Custom",
  });
  console.log(result);
}

async function main() {
  await billingAccountForecast();
  await billingProfileForecast();
  await departmentForecast();
  await enrollmentAccountForecast();
  await invoiceSectionForecast();
  await resourceGroupForecast();
  await subscriptionForecast();
}

main().catch(console.error);
