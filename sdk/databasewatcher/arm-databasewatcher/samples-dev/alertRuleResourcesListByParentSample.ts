// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DatabaseWatcherClient } from "@azure/arm-databasewatcher";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list AlertRuleResource resources by Watcher
 *
 * @summary list AlertRuleResource resources by Watcher
 * x-ms-original-file: 2025-01-02/AlertRuleResources_ListByParent_MaximumSet_Gen.json
 */
async function alertRuleResourcesListByParentMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A76F9850-996B-40B3-94D4-C98110A0EEC9";
  const client = new DatabaseWatcherClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.alertRuleResources.listByParent("rgWatcher", "testWatcher")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await alertRuleResourcesListByParentMaximumSet();
}

main().catch(console.error);
