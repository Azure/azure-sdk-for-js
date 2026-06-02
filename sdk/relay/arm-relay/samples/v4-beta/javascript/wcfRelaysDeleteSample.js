// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a WCF relay.
 *
 * @summary deletes a WCF relay.
 * x-ms-original-file: 2024-01-01/Relay/RelayDelete.json
 */
async function relayDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  await client.wcfRelays.delete(
    "resourcegroup",
    "example-RelayNamespace-01",
    "example-Relay-wcf-01",
  );
}

async function main() {
  await relayDelete();
}

main().catch(console.error);
