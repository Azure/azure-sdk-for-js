// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists associations for the specified data collection rule.
 *
 * @summary lists associations for the specified data collection rule.
 * x-ms-original-file: 2024-03-11/DataCollectionRuleAssociationsListByRule.json
 */
async function listAssociationsForSpecifiedDataCollectionRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dataCollectionRuleAssociations.listByRule(
    "myResourceGroup",
    "myCollectionRule",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAssociationsForSpecifiedDataCollectionRule();
}

main().catch(console.error);
