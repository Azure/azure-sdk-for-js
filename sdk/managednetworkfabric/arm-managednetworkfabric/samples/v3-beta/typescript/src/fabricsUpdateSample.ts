// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a Fabric.
 *
 * @summary updates a Fabric.
 * x-ms-original-file: 2026-01-15-preview/Fabrics_Update.json
 */
async function fabricsUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.fabrics.update("example-rg", "example-fabric", {
    tags: { environment: "staging" },
    properties: {
      infrastructureServices: {
        platformProxy: {
          httpProxy: "http://10.2.0.61:3128",
          httpsProxy: "http://10.2.0.61:3128",
          noProxy: ["10.2.0.0/24", "10.2.1.0/24", "localhost"],
        },
        ntpServers: ["10.2.0.100", "10.2.0.101"],
        dnsServers: ["10.2.0.50", "10.2.0.51"],
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await fabricsUpdateMaximumSetGen();
}

main().catch(console.error);
