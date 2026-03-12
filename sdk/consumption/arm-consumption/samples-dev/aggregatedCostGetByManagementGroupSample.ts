// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Provides the aggregate cost of a management group and all child management groups by current billing period.
 *
 * @summary Provides the aggregate cost of a management group and all child management groups by current billing period.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/AggregatedCostByManagementGroup.json
 */

import type { AggregatedCostGetByManagementGroupOptionalParams } from "@azure/arm-consumption";
import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function aggregatedCostByManagementGroup(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const managementGroupId = "managementGroupForTest";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const result = await client.aggregatedCost.getByManagementGroup(managementGroupId);
  console.log(result);
}

/**
 * This sample demonstrates how to Provides the aggregate cost of a management group and all child management groups by current billing period.
 *
 * @summary Provides the aggregate cost of a management group and all child management groups by current billing period.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/AggregatedCostByManagementGroupFilterByDate.json
 */
async function aggregatedCostByManagementGroupFilterByDate(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const managementGroupId = "managementGroupForTest";
  const filter = "usageStart ge '2018-08-15' and properties/usageStart le '2018-08-31'";
  const options: AggregatedCostGetByManagementGroupOptionalParams = { filter };
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const result = await client.aggregatedCost.getByManagementGroup(managementGroupId, options);
  console.log(result);
}

async function main(): Promise<void> {
  await aggregatedCostByManagementGroup();
  await aggregatedCostByManagementGroupFilterByDate();
}

main().catch(console.error);
