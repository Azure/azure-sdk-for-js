// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeClient } from "@azure/arm-sitemanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Site at SG scope
 *
 * @summary get Site at SG scope
 * x-ms-original-file: 2025-06-01/SitesByServiceGroup_Get_MaximumSet_Gen.json
 */
async function sitesByServiceGroupGetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new EdgeClient(credential, subscriptionId);
  const result = await client.sitesByServiceGroup.get("string", "string");
  console.log(result);
}

async function main(): Promise<void> {
  await sitesByServiceGroupGetGeneratedByMaximumSetRule();
}

main().catch(console.error);
