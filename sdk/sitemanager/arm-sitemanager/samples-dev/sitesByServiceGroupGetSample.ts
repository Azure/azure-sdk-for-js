// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeClient } from "@azure/arm-sitemanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Site
 *
 * @summary get a Site
 * x-ms-original-file: 2025-06-01/SitesByServiceGroup_Get_MaximumSet_Gen.json
 */
async function sitesByServiceGroupGetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EdgeClient(credential);
  const result = await client.sitesByServiceGroup.get("string", "string");
  console.log(result);
}

async function main(): Promise<void> {
  await sitesByServiceGroupGetGeneratedByMaximumSetRule();
}

main().catch(console.error);
