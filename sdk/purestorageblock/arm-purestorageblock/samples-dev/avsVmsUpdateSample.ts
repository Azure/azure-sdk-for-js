// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to update an AVS VM
 *
 * @summary update an AVS VM
 * x-ms-original-file: 2024-11-01/AvsVms_Update_MaximumSet_Gen.json
 */

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

async function avsVmsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.avsVms.update("rgpurestorage", "storagePoolname", "cbdec-ddbb", {
    properties: { softDeletion: { destroyed: true } },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await avsVmsUpdate();
}

main().catch(console.error);
