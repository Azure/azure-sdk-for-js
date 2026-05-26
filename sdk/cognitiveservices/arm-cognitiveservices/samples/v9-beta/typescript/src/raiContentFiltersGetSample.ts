// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Content Filters by Name.
 *
 * @summary get Content Filters by Name.
 * x-ms-original-file: 2026-01-15-preview/GetRaiContentFilter.json
 */
async function getRaiContentFilters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiContentFilters.get("WestUS", "IndirectAttack");
  console.log(result);
}

async function main(): Promise<void> {
  await getRaiContentFilters();
}

main().catch(console.error);
