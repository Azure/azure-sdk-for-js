// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a License
 *
 * @summary delete a License
 * x-ms-original-file: 2025-09-01/Licenses_Delete.json
 */
async function licensesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.licenses.delete("group1", "cloud1", "VmwareFirewall");
}

async function main() {
  await licensesDelete();
}

main().catch(console.error);
