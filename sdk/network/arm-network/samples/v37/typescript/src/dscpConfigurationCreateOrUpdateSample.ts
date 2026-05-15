// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a DSCP Configuration.
 *
 * @summary creates or updates a DSCP Configuration.
 * x-ms-original-file: 2025-05-01/DscpConfigurationCreate.json
 */
async function createDscpConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.dscpConfiguration.createOrUpdate("rg1", "mydscpconfig", {
    location: "eastus",
    qosDefinitionCollection: [
      {
        destinationIpRanges: [{ endIP: "127.0.10.2", startIP: "127.0.10.1" }],
        destinationPortRanges: [{ end: 15, start: 15 }],
        markings: [1],
        sourceIpRanges: [{ endIP: "127.0.0.2", startIP: "127.0.0.1" }],
        sourcePortRanges: [
          { end: 11, start: 10 },
          { end: 21, start: 20 },
        ],
        protocol: "Tcp",
      },
      {
        destinationIpRanges: [{ endIP: "12.0.10.2", startIP: "12.0.10.1" }],
        destinationPortRanges: [{ end: 52, start: 51 }],
        markings: [2],
        sourceIpRanges: [{ endIP: "12.0.0.2", startIP: "12.0.0.1" }],
        sourcePortRanges: [{ end: 12, start: 11 }],
        protocol: "Udp",
      },
    ],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createDscpConfiguration();
}

main().catch(console.error);
