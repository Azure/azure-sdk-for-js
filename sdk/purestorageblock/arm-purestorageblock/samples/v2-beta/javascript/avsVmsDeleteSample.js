// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an AVS VM
 *
 * @summary delete an AVS VM
 * x-ms-original-file: 2026-01-01-preview/AvsVms_Delete_MaximumSet_Gen.json
 */
async function avsVmsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  await client.avsVms.delete("rgpurestorage", "storagepool-01", "abc123def456");
}

async function main() {
  await avsVmsDelete();
}

main().catch(console.error);
