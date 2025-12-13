// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a HcxEnterpriseSite
 *
 * @summary create a HcxEnterpriseSite
 * x-ms-original-file: 2025-09-01/HcxEnterpriseSites_CreateOrUpdate.json
 */
async function hcxEnterpriseSitesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.hcxEnterpriseSites.createOrUpdate("group1", "cloud1", "site1", {});
  console.log(result);
}

async function main() {
  await hcxEnterpriseSitesCreateOrUpdate();
}

main().catch(console.error);
