// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to provides the aggregate cost of a management group and all child management groups by current billing period.
 *
 * @summary provides the aggregate cost of a management group and all child management groups by current billing period.
 * x-ms-original-file: 2024-08-01/AggregatedCostByManagementGroup.json
 */
async function aggregatedCostByManagementGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.aggregatedCost.getByManagementGroup("managementGroupForTest");
  console.log(result);
}

/**
 * This sample demonstrates how to provides the aggregate cost of a management group and all child management groups by current billing period.
 *
 * @summary provides the aggregate cost of a management group and all child management groups by current billing period.
 * x-ms-original-file: 2024-08-01/AggregatedCostByManagementGroupFilterByDate.json
 */
async function aggregatedCostByManagementGroupFilterByDate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.aggregatedCost.getByManagementGroup("managementGroupForTest", {
    filter: "usageStart ge '2018-08-15' and properties/usageStart le '2018-08-31'",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await aggregatedCostByManagementGroup();
  await aggregatedCostByManagementGroupFilterByDate();
}

main().catch(console.error);
