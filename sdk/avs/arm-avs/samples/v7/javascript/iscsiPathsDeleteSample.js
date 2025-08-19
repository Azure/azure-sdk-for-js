// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a IscsiPath
 *
 * @summary delete a IscsiPath
 * x-ms-original-file: 2024-09-01/IscsiPaths_Delete.json
 */
async function iscsiPathsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.iscsiPaths.delete("group1", "cloud1");
}

async function main() {
  await iscsiPathsDelete();
}

main().catch(console.error);
