// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the description for the specified hybrid connection.
 *
 * @summary returns the description for the specified hybrid connection.
 * x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridConnectionGet.json
 */
async function relayHybridConnectionGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.hybridConnections.get(
    "resourcegroup",
    "example-RelayNamespace-01",
    "example-Relay-Hybrid-01",
  );
  console.log(result);
}

async function main() {
  await relayHybridConnectionGet();
}

main().catch(console.error);
