// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkClient } = require("@azure/arm-dns");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the DNSSEC configuration.
 *
 * @summary gets the DNSSEC configuration.
 * x-ms-original-file: 2023-07-01-preview/GetDnssecConfig.json
 */
async function getDnssecConfig() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.dnssecConfigs.get("rg1", "zone1");
  console.log(result);
}

async function main() {
  await getDnssecConfig();
}

main().catch(console.error);
