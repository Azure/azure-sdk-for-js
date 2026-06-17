// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to provides the aggregate cost of a management group and all child management groups by specified billing period
 *
 * @summary provides the aggregate cost of a management group and all child management groups by specified billing period
 * x-ms-original-file: 2024-08-01/AggregatedCostForBillingPeriodByManagementGroup.json
 */
async function aggregatedCostListForBillingPeriodByManagementGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.aggregatedCost.getForBillingPeriodByManagementGroup(
    "managementGroupForTest",
    "201807",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await aggregatedCostListForBillingPeriodByManagementGroup();
}

main().catch(console.error);
