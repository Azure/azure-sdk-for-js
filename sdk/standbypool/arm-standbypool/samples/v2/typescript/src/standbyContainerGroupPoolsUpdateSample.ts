// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StandbyPoolManagementClient } from "@azure/arm-standbypool";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a StandbyContainerGroupPoolResource
 *
 * @summary update a StandbyContainerGroupPoolResource
 * x-ms-original-file: 2025-03-01/StandbyContainerGroupPools_Update.json
 */
async function standbyContainerGroupPoolsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000009";
  const client = new StandbyPoolManagementClient(credential, subscriptionId);
  const result = await client.standbyContainerGroupPools.update("rgstandbypool", "pool", {
    tags: {},
    properties: {
      elasticityProfile: { maxReadyCapacity: 1743, refillPolicy: "always" },
      containerGroupProperties: {
        containerGroupProfile: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000009/resourceGroups/rgstandbypool/providers/Microsoft.ContainerInstance/containerGroupProfiles/cgProfile",
          revision: 2,
        },
        subnetIds: [
          {
            id: "/subscriptions/00000000-0000-0000-0000-000000000009/resourceGroups/rgstandbypool/providers/Microsoft.Network/virtualNetworks/cgSubnet/subnets/cgSubnet",
          },
        ],
      },
      zones: ["1", "2", "3"],
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await standbyContainerGroupPoolsUpdate();
}

main().catch(console.error);
