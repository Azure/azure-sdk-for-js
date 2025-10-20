// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-virtualenclaves");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a EnclaveResource
 *
 * @summary update a EnclaveResource
 * x-ms-original-file: 2025-05-01-preview/VirtualEnclave_Update.json
 */
async function virtualEnclaveUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CA1CB369-DD26-4DB2-9D43-9AFEF0F22093";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.virtualEnclave.update("rgopenapi", "TestMyEnclave", {
    tags: { Tag1: "Value1" },
    properties: {
      enclaveVirtualNetwork: {
        networkSize: "small",
        customCidrRange: "10.0.0.0/24",
        subnetConfigurations: [{ subnetName: "test", networkPrefixSize: 26 }],
        allowSubnetCommunication: true,
      },
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
  });
  console.log(result);
}

async function main() {
  await virtualEnclaveUpdate();
}

main().catch(console.error);
