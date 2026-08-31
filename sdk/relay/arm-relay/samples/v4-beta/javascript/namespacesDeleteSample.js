// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing namespace. This operation also removes all associated resources under the namespace.
 *
 * @summary deletes an existing namespace. This operation also removes all associated resources under the namespace.
 * x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceDelete.json
 */
async function relayNameSpaceDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  await client.namespaces.delete("SouthCentralUS", "example-RelayNamespace-5849");
}

async function main() {
  await relayNameSpaceDelete();
}

main().catch(console.error);
