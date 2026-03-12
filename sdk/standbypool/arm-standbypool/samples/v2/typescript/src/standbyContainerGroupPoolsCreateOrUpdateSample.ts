// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StandbyPoolManagementClient } from "@azure/arm-standbypool";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a StandbyContainerGroupPoolResource
 *
 * @summary create a StandbyContainerGroupPoolResource
 * x-ms-original-file: 2025-03-01/StandbyContainerGroupPools_CreateOrUpdate.json
 */
async function standbyContainerGroupPoolsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000009";
  const client = new StandbyPoolManagementClient(credential, subscriptionId);
  const result = await client.standbyContainerGroupPools.createOrUpdate("rgstandbypool", "pool", {
    properties: {
      elasticityProfile: { maxReadyCapacity: 688, refillPolicy: "always" },
      containerGroupProperties: {
        containerGroupProfile: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000009/resourceGroups/rgstandbypool/providers/Microsoft.ContainerInstance/containerGroupProfiles/cgProfile",
          revision: 1,
        },
        subnetIds: [
          {
            id: "/subscriptions/00000000-0000-0000-0000-000000000009/resourceGroups/rgstandbypool/providers/Microsoft.Network/virtualNetworks/cgSubnet/subnets/cgSubnet",
          },
        ],
      },
      zones: ["1", "2", "3"],
    },
    tags: {},
    location: "West US",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await standbyContainerGroupPoolsCreateOrUpdate();
}

main().catch(console.error);
