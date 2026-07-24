// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a data collection rule.
 *
 * @summary deletes a data collection rule.
 * x-ms-original-file: 2024-03-11/DataCollectionRulesDelete.json
 */
async function deleteDataCollectionRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  await client.dataCollectionRules.delete("myResourceGroup", "myCollectionRule");
}

async function main(): Promise<void> {
  await deleteDataCollectionRule();
}

main().catch(console.error);
