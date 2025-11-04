// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to check the specified namespace name availability.
 *
 * @summary check the specified namespace name availability.
 * x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceCheckNameAvailability.json
 */
async function relayCheckNameAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.namespaces.checkNameAvailability({
    name: "example-RelayNamespace1321",
  });
  console.log(result);
}

async function main() {
  await relayCheckNameAvailability();
}

main().catch(console.error);
