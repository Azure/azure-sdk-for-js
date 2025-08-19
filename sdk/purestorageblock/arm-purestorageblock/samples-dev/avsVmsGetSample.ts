// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get an AVS VM
 *
 * @summary get an AVS VM
 * x-ms-original-file: 2024-11-01/AvsVms_Get_MaximumSet_Gen.json
 */

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

async function avsVmsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.avsVms.get("rgpurestorage", "storagePoolname", "cbdec-ddbb");
  console.log(result);
}

async function main(): Promise<void> {
  await avsVmsGet();
}

main().catch(console.error);
