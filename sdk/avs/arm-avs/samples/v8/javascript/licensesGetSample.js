// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a License
 *
 * @summary get a License
 * x-ms-original-file: 2025-09-01/Licenses_Get.json
 */
async function licensesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.licenses.get("group1", "cloud1", "VmwareFirewall");
  console.log(result);
}

async function main() {
  await licensesGet();
}

main().catch(console.error);
