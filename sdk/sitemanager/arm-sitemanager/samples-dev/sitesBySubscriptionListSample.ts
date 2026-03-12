// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeClient } from "@azure/arm-sitemanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Site resources by subscription ID
 *
 * @summary list Site resources by subscription ID
 * x-ms-original-file: 2025-06-01/SitesBySubscription_List_MaximumSet_Gen.json
 */
async function listBySubscriptionGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0154f7fe-df09-4981-bf82-7ad5c1f596eb";
  const client = new EdgeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sitesBySubscription.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listBySubscriptionGeneratedByMaximumSetRule();
}

main().catch(console.error);
