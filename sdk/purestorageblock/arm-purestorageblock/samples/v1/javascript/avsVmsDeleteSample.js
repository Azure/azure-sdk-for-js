// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an AVS VM
 *
 * @summary delete an AVS VM
 * x-ms-original-file: 2024-11-01/AvsVms_Delete_MaximumSet_Gen.json
 */
async function avsVmsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  await client.avsVms.delete("rgpurestorage", "storagePoolname", "cbdec-ddbb");
}

async function main() {
  await avsVmsDelete();
}

main().catch(console.error);
