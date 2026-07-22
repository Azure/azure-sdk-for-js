// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the available namespaces within the ResourceGroup.
 *
 * @summary lists all the available namespaces within the ResourceGroup.
 * x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceListByResourceGroup.json
 */
async function relayNameSpaceListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.namespaces.listByResourceGroup("resourcegroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await relayNameSpaceListByResourceGroup();
}

main().catch(console.error);
