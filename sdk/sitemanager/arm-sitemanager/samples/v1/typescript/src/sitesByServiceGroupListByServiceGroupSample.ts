// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeClient } from "@azure/arm-sitemanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Site at SG scope
 *
 * @summary list Site at SG scope
 * x-ms-original-file: 2025-06-01/SitesByServiceGroup_ListByServiceGroup_MaximumSet_Gen.json
 */
async function sitesByServiceGroupListByServiceGroupGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new EdgeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sitesByServiceGroup.listByServiceGroup("string")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await sitesByServiceGroupListByServiceGroupGeneratedByMaximumSetRule();
}

main().catch(console.error);
