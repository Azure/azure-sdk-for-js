// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-virtualenclaves");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a EnclaveResource
 *
 * @summary create a EnclaveResource
 * x-ms-original-file: 2025-05-01-preview/VirtualEnclave_CreateOrUpdate.json
 */
async function virtualEnclaveCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c64f6eca-bdc5-4bc2-88d6-f8f1dc23f86c";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.virtualEnclave.createOrUpdate("rgopenapi", "TestMyEnclave", {
    identity: {
      type: "SystemAssigned,UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/subid/resourceGroups/default-azurebatch-japaneast/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id1":
          {},
      },
    },
    properties: {
      enclaveVirtualNetwork: {
        networkSize: "small",
        customCidrRange: "10.0.0.0/24",
        subnetConfigurations: [{ subnetName: "test", networkPrefixSize: 26 }],
        allowSubnetCommunication: true,
      },
      communityResourceId:
        "/subscriptions/c64f6eca-bdc5-4bc2-88d6-f8f1dc23f86c/resourceGroups/TestMyRg/providers/microsoft.mission/communities/TestMyCommunity",
      enclaveDefaultSettings: { diagnosticDestination: "Both" },
      maintenanceModeConfiguration: {
        mode: "Off",
        principals: [{ id: "355a6bb0-abc0-4cba-000d-12a345b678c9", type: "User" }],
        justification: "Off",
      },
      bastionEnabled: true,
      enclaveRoleAssignments: [
        {
          roleDefinitionId: "b24988ac-6180-42a0-ab88-20f7382dd24c",
          principals: [
            { id: "355a6bb0-abc0-4cba-000d-12a345b678c9", type: "User" },
            { id: "355a6bb0-abc0-4cba-000d-12a345b678c0", type: "User" },
          ],
        },
        {
          roleDefinitionId: "18d7d88d-d35e-4fb5-a5c3-7773c20a72d9",
          principals: [{ id: "355a6bb0-abc0-4cba-000d-12a345b678c9", type: "User" }],
        },
      ],
      workloadRoleAssignments: [
        {
          roleDefinitionId: "d73bb868-a0df-4d4d-bd69-98a00b01fccb",
          principals: [{ id: "01234567-89ab-ef01-2345-0123456789ab", type: "Group" }],
        },
        {
          roleDefinitionId: "fb879df8-f326-4884-b1cf-06f3ad86be52",
          principals: [{ id: "01234567-89ab-ef01-2345-0123456789ab", type: "Group" }],
        },
      ],
    },
    tags: { Tag1: "Value1" },
    location: "westcentralus",
  });
  console.log(result);
}

async function main() {
  await virtualEnclaveCreateOrUpdate();
}

main().catch(console.error);
