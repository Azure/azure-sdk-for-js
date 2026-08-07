// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FabricClient } = require("@azure/arm-fabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a FabricCapacity
 *
 * @summary get a FabricCapacity
 * x-ms-original-file: 2026-08-01-preview/FabricCapacities_Get.json
 */
async function getACapacity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "548B7FB7-3B2A-4F46-BB02-66473F1FC22C";
  const client = new FabricClient(credential, subscriptionId);
  const result = await client.fabricCapacities.get("TestRG", "azsdktest");
  console.log(result);
}

async function main() {
  await getACapacity();
}

main().catch(console.error);
