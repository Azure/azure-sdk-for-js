// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to query the usage data for external cloud provider type defined.
 *
 * @summary query the usage data for external cloud provider type defined.
 * x-ms-original-file: 2025-03-01/ExternalBillingAccountsQuery.json
 */
async function externalBillingAccountQueryList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.query.usageByExternalCloudProviderType(
    "externalBillingAccounts",
    "100",
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
 * This sample demonstrates how to query the usage data for external cloud provider type defined.
 *
 * @summary query the usage data for external cloud provider type defined.
 * x-ms-original-file: 2025-03-01/ExternalSubscriptionsQuery.json
 */
async function externalSubscriptionsQuery(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.query.usageByExternalCloudProviderType(
    "externalSubscriptions",
    "100",
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

async function main(): Promise<void> {
  await externalBillingAccountQueryList();
  await externalSubscriptionsQuery();
}

main().catch(console.error);
