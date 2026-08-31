// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a hybrid connection.
 *
 * @summary deletes a hybrid connection.
 * x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridconnectionDelete.json
 */
async function relayHybridconnectionDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  await client.hybridConnections.delete(
    "resourcegroup",
    "example-RelayNamespace-01",
    "example-Relay-Hybrid-01",
  );
}

async function main() {
  await relayHybridconnectionDelete();
}

main().catch(console.error);
