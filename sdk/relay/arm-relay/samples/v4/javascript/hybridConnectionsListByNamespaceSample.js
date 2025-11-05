// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the hybrid connection within the namespace.
 *
 * @summary lists the hybrid connection within the namespace.
 * x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridConnectionListAll.json
 */
async function relayHybridConnectionListAll() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.hybridConnections.listByNamespace(
    "resourcegroup",
    "example-RelayNamespace-01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await relayHybridConnectionListAll();
}

main().catch(console.error);
