// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to aPI to update certain properties of the IP Prefix resource.
 *
 * @summary aPI to update certain properties of the IP Prefix resource.
 * x-ms-original-file: 2024-06-15-preview/IpPrefixes_Update.json
 */
async function ipPrefixesUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.ipPrefixes.update("example-rg", "example-ipPrefix", {
    tags: { KeyId: "KeyValue" },
    properties: {
      annotation: "annotation",
      ipPrefixRules: [
        {
          action: "Permit",
          sequenceNumber: 4155123341,
          networkPrefix: "10.10.10.10/30",
          condition: "GreaterThanOrEqualTo",
          subnetMaskLength: "10",
        },
      ],
    },
  });
  console.log(result);
}

async function main() {
  await ipPrefixesUpdateMaximumSetGen();
}

main().catch(console.error);
