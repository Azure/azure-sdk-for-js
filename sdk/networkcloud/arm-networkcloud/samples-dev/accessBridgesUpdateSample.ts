// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloud } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update properties of the provided access bridge, or update tags associated with the access bridge. Properties and tag updates can be done independently.
 *
 * @summary update properties of the provided access bridge, or update tags associated with the access bridge. Properties and tag updates can be done independently.
 * x-ms-original-file: 2026-05-01-preview/AccessBridges_Patch.json
 */
async function patchAccessBridge(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.accessBridges.update("resourceGroupName", "Bastion", {
    accessBridgeUpdateParameters: {
      properties: {
        securityRules: [
          {
            description: "Allow management plane egress",
            direction: "Outbound",
            ipv4Addresses: ["10.10.20.10-10.10.20.20"],
            ipv6Addresses: ["2001:db8:abcd:12::1000-2001:db8:abcd:12::1fff"],
            port: "24562-24570",
          },
        ],
      },
      tags: { key1: "myvalue1", key2: "myvalue2" },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await patchAccessBridge();
}

main().catch(console.error);
