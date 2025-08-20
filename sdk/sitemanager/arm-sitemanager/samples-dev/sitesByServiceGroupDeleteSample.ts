// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete Site at SG scope
 *
 * @summary delete Site at SG scope
 * x-ms-original-file: 2025-03-01-preview/SitesByServiceGroup_Delete_MaximumSet_Gen.json
 */

import { EdgeClient } from "@azure/arm-sitemanager";
import { DefaultAzureCredential } from "@azure/identity";

async function sitesByServiceGroupDeleteGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new EdgeClient(credential, subscriptionId);
  await client.sitesByServiceGroup.delete("string", "string");
}

async function main(): Promise<void> {
  await sitesByServiceGroupDeleteGeneratedByMaximumSetRule();
}

main().catch(console.error);
