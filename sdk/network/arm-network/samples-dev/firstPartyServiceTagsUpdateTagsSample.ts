// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a first party service tag tags.
 *
 * @summary updates a first party service tag tags.
 * x-ms-original-file: 2025-09-01/FirstPartyServiceTagUpdateTags.json
 */
async function updateFirstPartyServiceTagTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firstPartyServiceTags.updateTags("rg1", "myServiceTag", {
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateFirstPartyServiceTagTags();
}

main().catch(console.error);
