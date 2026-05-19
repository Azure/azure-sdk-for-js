// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get an AVS VM
 *
 * @summary get an AVS VM
 * x-ms-original-file: 2026-01-01-preview/AvsVms_Get_MaximumSet_Gen.json
 */
async function avsVmsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.avsVms.get("rgpurestorage", "storagepool-01", "abc123def456");
  console.log(result);
}

async function main(): Promise<void> {
  await avsVmsGet();
}

main().catch(console.error);
