// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list HcxEnterpriseSite resources by PrivateCloud
 *
 * @summary list HcxEnterpriseSite resources by PrivateCloud
 * x-ms-original-file: 2025-09-01/HcxEnterpriseSites_List.json
 */
async function hcxEnterpriseSitesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.hcxEnterpriseSites.list("group1", "cloud1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await hcxEnterpriseSitesList();
}

main().catch(console.error);
