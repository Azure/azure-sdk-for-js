// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PurviewManagementClient } = require("@azure/arm-purview");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of privately linkable resources for an account
 *
 * @summary gets a list of privately linkable resources for an account
 * x-ms-original-file: 2024-04-01-preview/PrivateLinkResources_ListByAccount.json
 */
async function privateLinkResourcesListByAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-12345678abc";
  const client = new PurviewManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkResources.listByAccount(
    "SampleResourceGroup",
    "account1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await privateLinkResourcesListByAccount();
}

main().catch(console.error);
