// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a PrivateCloud
 *
 * @summary delete a PrivateCloud
 * x-ms-original-file: 2025-09-01/PrivateClouds_Delete.json
 */
async function privateCloudsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.privateClouds.delete("group1", "cloud1");
}

async function main() {
  await privateCloudsDelete();
}

main().catch(console.error);
