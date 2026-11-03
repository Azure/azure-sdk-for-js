// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the forecast charges for external cloud provider type defined.
 *
 * @summary lists the forecast charges for external cloud provider type defined.
 * x-ms-original-file: 2025-03-01/ExternalBillingAccountForecast.json
 */
async function externalBillingAccountForecast(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.forecast.externalCloudProviderUsage(
    "externalBillingAccounts",
    "100",
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
 * This sample demonstrates how to lists the forecast charges for external cloud provider type defined.
 *
 * @summary lists the forecast charges for external cloud provider type defined.
 * x-ms-original-file: 2025-03-01/ExternalSubscriptionForecast.json
 */
async function externalSubscriptionForecast(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.forecast.externalCloudProviderUsage("externalSubscriptions", "100", {
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
    timePeriod: {
      from: new Date("2022-08-01T00:00:00+00:00"),
      to: new Date("2022-08-31T23:59:59+00:00"),
    },
    timeframe: "Custom",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await externalBillingAccountForecast();
  await externalSubscriptionForecast();
}

main().catch(console.error);
