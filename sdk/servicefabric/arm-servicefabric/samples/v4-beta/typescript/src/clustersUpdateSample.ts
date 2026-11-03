// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagementClient } from "@azure/arm-servicefabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the configuration of a Service Fabric cluster resource with the specified name.
 *
 * @summary update the configuration of a Service Fabric cluster resource with the specified name.
 * x-ms-original-file: 2026-03-01-preview/ClusterPatchOperation_example.json
 */
async function patchACluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  const result = await client.clusters.update("resRg", "myCluster", {
    enableHttpGatewayExclusiveAuthMode: true,
    eventStoreServiceEnabled: true,
    nodeTypes: [
      {
        name: "nt1vm",
        applicationPorts: { endPort: 30000, startPort: 20000 },
        clientConnectionEndpointPort: 19000,
        durabilityLevel: "Bronze",
        ephemeralPorts: { endPort: 64000, startPort: 49000 },
        httpGatewayEndpointPort: 19007,
        httpGatewayTokenAuthEndpointPort: 19081,
        isPrimary: true,
        vmInstanceCount: 5,
      },
      {
        name: "testnt1",
        applicationPorts: { endPort: 2000, startPort: 1000 },
        clientConnectionEndpointPort: 0,
        durabilityLevel: "Bronze",
        ephemeralPorts: { endPort: 4000, startPort: 3000 },
        httpGatewayEndpointPort: 0,
        httpGatewayTokenAuthEndpointPort: 19081,
        isPrimary: false,
        vmInstanceCount: 3,
      },
    ],
    reliabilityLevel: "Bronze",
    upgradeMode: "Automatic",
    upgradePauseEndTimestampUtc: new Date("2021-06-25T22:00:00Z"),
    upgradePauseStartTimestampUtc: new Date("2021-06-21T22:00:00Z"),
    upgradeWave: "Wave",
    tags: { a: "b" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await patchACluster();
}

main().catch(console.error);
