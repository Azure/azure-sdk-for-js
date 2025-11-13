// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to implements IP Prefix PUT method.
 *
 * @summary implements IP Prefix PUT method.
 * x-ms-original-file: 2024-06-15-preview/IpPrefixes_Create.json
 */
async function ipPrefixesCreateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.ipPrefixes.create("example-rg", "example-ipPrefix", {
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
      administrativeState: "Enabled",
    },
    tags: { KeyId: "KeyValue" },
    location: "eastus",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await ipPrefixesCreateMaximumSetGen();
}

main().catch(console.error);
