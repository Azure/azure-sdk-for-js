// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get all available tag keys for the defined scope
 *
 * @summary Get all available tag keys for the defined scope
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/Tags.json
 */

import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function tagsGet(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "providers/Microsoft.CostManagement/billingAccounts/1234";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const result = await client.tags.get(scope);
  console.log(result);
}

async function main(): Promise<void> {
  await tagsGet();
}

main().catch(console.error);
