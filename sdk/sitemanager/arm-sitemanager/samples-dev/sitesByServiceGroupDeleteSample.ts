// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeClient } from "@azure/arm-sitemanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Site
 *
 * @summary delete a Site
 * x-ms-original-file: 2025-06-01/SitesByServiceGroup_Delete_MaximumSet_Gen.json
 */
async function sitesByServiceGroupDeleteGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EdgeClient(credential);
  await client.sitesByServiceGroup.delete("string", "string");
}

async function main(): Promise<void> {
  await sitesByServiceGroupDeleteGeneratedByMaximumSetRule();
}

main().catch(console.error);
