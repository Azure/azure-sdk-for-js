// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a HcxEnterpriseSite
 *
 * @summary delete a HcxEnterpriseSite
 * x-ms-original-file: 2025-09-01/HcxEnterpriseSites_Delete.json
 */
async function hcxEnterpriseSitesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.hcxEnterpriseSites.delete("group1", "cloud1", "site1");
}

async function main() {
  await hcxEnterpriseSitesDelete();
}

main().catch(console.error);
