// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to limits constraining certain resource properties.
 *
 * @summary limits constraining certain resource properties.
 * x-ms-original-file: 2026-01-01-preview/Reservations_GetResourceLimits_MaximumSet_Gen.json
 */
async function reservationsGetResourceLimits() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.reservations.getResourceLimits("rgpurestorage", "storagepool-01");
  console.log(result);
}

async function main() {
  await reservationsGetResourceLimits();
}

main().catch(console.error);
