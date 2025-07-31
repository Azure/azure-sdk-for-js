// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the WCF relays within the namespace.
 *
 * @summary lists the WCF relays within the namespace.
 * x-ms-original-file: 2024-01-01/Relay/RelayListAll.json
 */
async function relayListAll() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.wcfRelays.listByNamespace(
    "resourcegroup",
    "example-RelayNamespace-01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await relayListAll();
}

main().catch(console.error);
