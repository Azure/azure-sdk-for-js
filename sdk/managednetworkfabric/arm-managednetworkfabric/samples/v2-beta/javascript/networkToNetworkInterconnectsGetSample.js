// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to implements NetworkToNetworkInterconnects GET method.
 *
 * @summary implements NetworkToNetworkInterconnects GET method.
 * x-ms-original-file: 2024-06-15-preview/NetworkToNetworkInterconnects_Get.json
 */
async function networkToNetworkInterconnectsGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkToNetworkInterconnects.get(
    "example-rg",
    "example-nf",
    "example-nni",
  );
  console.log(result);
}

async function main() {
  await networkToNetworkInterconnectsGetMaximumSetGen();
}

main().catch(console.error);
