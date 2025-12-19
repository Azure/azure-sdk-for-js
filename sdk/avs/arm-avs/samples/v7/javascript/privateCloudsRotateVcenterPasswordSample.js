// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to rotate the vCenter password
 *
 * @summary rotate the vCenter password
 * x-ms-original-file: 2025-09-01/PrivateClouds_RotateVcenterPassword.json
 */
async function privateCloudsRotateVcenterPassword() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.privateClouds.rotateVcenterPassword("group1", "cloud1");
}

async function main() {
  await privateCloudsRotateVcenterPassword();
}

main().catch(console.error);
