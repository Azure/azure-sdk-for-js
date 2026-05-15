// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates public IP prefix tags.
 *
 * @summary updates public IP prefix tags.
 * x-ms-original-file: 2025-05-01/PublicIpPrefixUpdateTags.json
 */
async function updatePublicIPPrefixTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPPrefixes.updateTags("rg1", "test-ipprefix", {
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updatePublicIPPrefixTags();
}

main().catch(console.error);
