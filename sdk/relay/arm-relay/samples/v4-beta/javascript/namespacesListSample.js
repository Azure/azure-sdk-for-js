// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the available namespaces within the subscription regardless of the resourceGroups.
 *
 * @summary lists all the available namespaces within the subscription regardless of the resourceGroups.
 * x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceListBySubscription.json
 */
async function relayNameSpaceListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.namespaces.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await relayNameSpaceListBySubscription();
}

main().catch(console.error);
