// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StandbyPoolManagementClient } = require("@azure/arm-standbypool");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a StandbyContainerGroupPoolResource
 *
 * @summary update a StandbyContainerGroupPoolResource
 * x-ms-original-file: 2025-03-01/StandbyContainerGroupPools_Update.json
 */
async function standbyContainerGroupPoolsUpdate() {
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

async function main() {
  await standbyContainerGroupPoolsUpdate();
}

main().catch(console.error);
