// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the license for the private cloud
 *
 * @summary get the license for the private cloud
 * x-ms-original-file: 2025-09-01/PrivateClouds_GetVcfLicense.json
 */
async function privateCloudsGetVcfLicense() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.privateClouds.getVcfLicense("group1", "cloud1");
  console.log(result);
}

async function main() {
  await privateCloudsGetVcfLicense();
}

main().catch(console.error);
