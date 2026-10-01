// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to implements IP Prefix PUT method.
 *
 * @summary implements IP Prefix PUT method.
 * x-ms-original-file: 2025-07-15/IpPrefixes_Create.json
 */
async function ipPrefixesCreateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.ipPrefixes.create("example-rg", "example-ipPrefix", {
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
    tags: { KeyId: "KeyValue" },
    location: "eastus",
  });
  console.log(result);
}

async function main() {
  await ipPrefixesCreateMaximumSetGen();
}

main().catch(console.error);
