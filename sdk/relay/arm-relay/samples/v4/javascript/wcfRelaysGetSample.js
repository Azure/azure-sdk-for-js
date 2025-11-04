// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the description for the specified WCF relay.
 *
 * @summary returns the description for the specified WCF relay.
 * x-ms-original-file: 2024-01-01/Relay/RelayGet.json
 */
async function relayGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.wcfRelays.get(
    "resourcegroup",
    "example-RelayNamespace-9953",
    "example-Relay-Wcf-1194",
  );
  console.log(result);
}

async function main() {
  await relayGet();
}

main().catch(console.error);
