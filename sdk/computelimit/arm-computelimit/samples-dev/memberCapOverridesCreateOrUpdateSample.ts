// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeLimitClient } from "@azure/arm-computelimit";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or replaces the cap override for a single member subscription.
 *
 * @summary creates or replaces the cap override for a single member subscription.
 * x-ms-original-file: 2026-07-01/MemberCapOverrides_CreateOrUpdate.json
 */
async function createOrUpdateASingleMemberCapOverride(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new ComputeLimitClient(credential, subscriptionId);
  const result = await client.memberCapOverrides.createOrUpdate(
    "eastus",
    "StandardDSv3Family",
    "11111111-1111-1111-1111-111111111111",
    { properties: { cap: 250 } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateASingleMemberCapOverride();
}

main().catch(console.error);
