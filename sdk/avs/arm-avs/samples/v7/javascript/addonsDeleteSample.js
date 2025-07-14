// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Addon
 *
 * @summary delete a Addon
 * x-ms-original-file: 2024-09-01/Addons_Delete.json
 */
async function addonsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.addons.delete("group1", "cloud1", "srm");
}

async function main() {
  await addonsDelete();
}

main().catch(console.error);
