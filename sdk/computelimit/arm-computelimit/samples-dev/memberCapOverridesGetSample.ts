// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeLimitClient } from "@azure/arm-computelimit";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the cap override configured for a single member subscription.
 *
 * @summary gets the cap override configured for a single member subscription.
 * x-ms-original-file: 2026-07-01/MemberCapOverrides_Get.json
 */
async function getASingleMemberCapOverride(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new ComputeLimitClient(credential, subscriptionId);
  const result = await client.memberCapOverrides.get(
    "eastus",
    "StandardDSv3Family",
    "11111111-1111-1111-1111-111111111111",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getASingleMemberCapOverride();
}

main().catch(console.error);
