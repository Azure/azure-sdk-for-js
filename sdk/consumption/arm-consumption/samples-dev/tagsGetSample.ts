// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get all available tag keys for the defined scope
 *
 * @summary get all available tag keys for the defined scope
 * x-ms-original-file: 2024-08-01/Tags.json
 */
async function tagsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.tags.get("providers/Microsoft.CostManagement/billingAccounts/1234");
  console.log(result);
}

async function main(): Promise<void> {
  await tagsGet();
}

main().catch(console.error);
