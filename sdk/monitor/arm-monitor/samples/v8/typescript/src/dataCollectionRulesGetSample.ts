// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the specified data collection rule.
 *
 * @summary returns the specified data collection rule.
 * x-ms-original-file: 2024-03-11/DataCollectionRulesGet.json
 */
async function getDataCollectionRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.dataCollectionRules.get("myResourceGroup", "myCollectionRule");
  console.log(result);
}

async function main(): Promise<void> {
  await getDataCollectionRule();
}

main().catch(console.error);
