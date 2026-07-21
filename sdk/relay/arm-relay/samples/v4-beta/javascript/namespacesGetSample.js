// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the description for the specified namespace.
 *
 * @summary returns the description for the specified namespace.
 * x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceGet.json
 */
async function relayNameSpaceGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.namespaces.get("RG-eg", "example-RelayRelayNamespace-01");
  console.log(result);
}

async function main() {
  await relayNameSpaceGet();
}

main().catch(console.error);
