// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the admin credentials for the private cloud
 *
 * @summary list the admin credentials for the private cloud
 * x-ms-original-file: 2024-09-01/PrivateClouds_ListAdminCredentials.json
 */
async function privateCloudsListAdminCredentials() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.privateClouds.listAdminCredentials("group1", "cloud1");
  console.log(result);
}

async function main() {
  await privateCloudsListAdminCredentials();
}

main().catch(console.error);
