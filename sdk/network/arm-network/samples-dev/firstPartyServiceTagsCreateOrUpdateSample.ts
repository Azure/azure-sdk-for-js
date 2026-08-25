// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a first party service tag.
 *
 * @summary creates or updates a first party service tag.
 * x-ms-original-file: 2025-09-01/FirstPartyServiceTagCreate.json
 */
async function createFirstPartyServiceTag(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firstPartyServiceTags.createOrUpdate("rg1", "myServiceTag", {
    location: "eastus",
    tags: { key1: "value1" },
    properties: { value: "myServiceTagValue" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createFirstPartyServiceTag();
}

main().catch(console.error);
