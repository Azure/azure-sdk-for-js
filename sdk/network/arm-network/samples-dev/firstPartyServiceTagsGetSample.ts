// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified first party service tag.
 *
 * @summary gets the specified first party service tag.
 * x-ms-original-file: 2025-09-01/FirstPartyServiceTagGet.json
 */
async function getFirstPartyServiceTag(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firstPartyServiceTags.get("rg1", "myServiceTag");
  console.log(result);
}

async function main(): Promise<void> {
  await getFirstPartyServiceTag();
}

main().catch(console.error);
