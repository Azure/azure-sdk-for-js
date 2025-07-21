// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkClient } = require("@azure/arm-dns");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the DNSSEC configuration on a DNS zone. This operation cannot be undone.
 *
 * @summary deletes the DNSSEC configuration on a DNS zone. This operation cannot be undone.
 * x-ms-original-file: 2023-07-01-preview/DeleteDnssecConfig.json
 */
async function deleteDnssecConfig() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  await client.dnssecConfigs.delete("rg1", "zone1");
}

async function main() {
  await deleteDnssecConfig();
}

main().catch(console.error);
