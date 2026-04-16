// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list ProvisionedNetwork resources by PrivateCloud
 *
 * @summary list ProvisionedNetwork resources by PrivateCloud
 * x-ms-original-file: 2025-09-01/ProvisionedNetworks_List.json
 */
async function provisionedNetworksList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.provisionedNetworks.list("group1", "cloud1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await provisionedNetworksList();
}

main().catch(console.error);
