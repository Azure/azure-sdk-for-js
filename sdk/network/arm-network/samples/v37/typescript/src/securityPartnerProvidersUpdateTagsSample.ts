// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates tags of a Security Partner Provider resource.
 *
 * @summary updates tags of a Security Partner Provider resource.
 * x-ms-original-file: 2025-05-01/SecurityPartnerProviderUpdateTags.json
 */
async function updateSecurityPartnerProviderTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.securityPartnerProviders.updateTags(
    "rg1",
    "securityPartnerProvider",
    { tags: { tag1: "value1", tag2: "value2" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateSecurityPartnerProviderTags();
}

main().catch(console.error);
