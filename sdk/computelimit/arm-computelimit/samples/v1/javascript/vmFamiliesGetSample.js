// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeLimitClient } = require("@azure/arm-computelimit");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the properties of a VM family.
 *
 * @summary gets the properties of a VM family.
 * x-ms-original-file: 2026-04-30/VmFamilies_Get.json
 */
async function getAVMFamily() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeLimitClient(credential, subscriptionId);
  const result = await client.vmFamilies.get("eastus", "standardDSv2Family");
  console.log(result);
}

async function main() {
  await getAVMFamily();
}

main().catch(console.error);
