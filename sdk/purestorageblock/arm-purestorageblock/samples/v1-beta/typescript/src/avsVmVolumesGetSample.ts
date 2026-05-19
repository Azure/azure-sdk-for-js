// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a volume in an AVS VM
 *
 * @summary get a volume in an AVS VM
 * x-ms-original-file: 2026-01-01-preview/AvsVmVolumes_Get_MaximumSet_Gen.json
 */
async function avsVmVolumesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.avsVmVolumes.get(
    "rgpurestorage",
    "storagepool-01",
    "abc123def456",
    "a1b2c3d4-e5f6",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await avsVmVolumesGet();
}

main().catch(console.error);
