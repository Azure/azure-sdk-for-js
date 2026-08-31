// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create or update a view. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 *
 * @summary the operation to create or update a view. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 * x-ms-original-file: 2025-03-01/ViewCreateOrUpdateByResourceGroup.json
 */
async function resourceGroupCreateOrUpdateView(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.views.createOrUpdateByScope(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG",
    "swaggerExample",
    {
      eTag: '"1d4ff9fe66f1d10"',
      accumulated: "true",
      chart: "Table",
      displayName: "swagger Example",
      kpis: [
        { type: "Forecast", enabled: true },
        {
          type: "Budget",
          enabled: true,
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG/providers/Microsoft.Consumption/budgets/swaggerDemo",
        },
      ],
      metric: "ActualCost",
      pivots: [
        { name: "ServiceName", type: "Dimension" },
        { name: "MeterCategory", type: "Dimension" },
        { name: "swaggerTagKey", type: "TagKey" },
      ],
      query: {
        type: "Usage",
        dataSet: {
          aggregation: { totalCost: { name: "PreTaxCost", function: "Sum" } },
          granularity: "Daily",
          grouping: [],
          sorting: [{ name: "UsageDate", direction: "Ascending" }],
        },
        timeframe: "MonthToDate",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await resourceGroupCreateOrUpdateView();
}

main().catch(console.error);
