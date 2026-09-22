// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMapsManagementClient } = require("@azure/arm-maps");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the private link resources that are available to be used for the Maps Account.
 *
 * @summary gets the private link resources that are available to be used for the Maps Account.
 * x-ms-original-file: 2025-10-01-preview/PrivateLinkResources_List.json
 */
async function privateLinkResourcesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "21a9967a-e8a9-4656-a70b-96ff1c4d05a0";
  const client = new AzureMapsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkResources.listByAccount(
    "myResourceGroup",
    "myMapsAccount",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await privateLinkResourcesList();
}

main().catch(console.error);
