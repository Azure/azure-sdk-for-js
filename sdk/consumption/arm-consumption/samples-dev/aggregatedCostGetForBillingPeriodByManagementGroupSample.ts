// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Provides the aggregate cost of a management group and all child management groups by specified billing period
 *
 * @summary Provides the aggregate cost of a management group and all child management groups by specified billing period
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/AggregatedCostForBillingPeriodByManagementGroup.json
 */

import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function aggregatedCostListForBillingPeriodByManagementGroup(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const managementGroupId = "managementGroupForTest";
  const billingPeriodName = "201807";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const result = await client.aggregatedCost.getForBillingPeriodByManagementGroup(
    managementGroupId,
    billingPeriodName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await aggregatedCostListForBillingPeriodByManagementGroup();
}

main().catch(console.error);
