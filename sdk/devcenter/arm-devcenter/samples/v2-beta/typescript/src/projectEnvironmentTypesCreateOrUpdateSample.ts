// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a project environment type.
 *
 * @summary creates or updates a project environment type.
 * x-ms-original-file: 2026-01-01-preview/ProjectEnvironmentTypes_Put.json
 */
async function projectEnvironmentTypesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.projectEnvironmentTypes.createOrUpdate(
    "rg1",
    "ContosoProj",
    "DevTest",
    {
      location: "centralus",
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/identityGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/testidentity1":
            {},
        },
      },
      properties: {
        creatorRoleAssignment: { roles: { "4cbf0b6c-e750-441c-98a7-10da8387e4d6": {} } },
        deploymentTargetId: "/subscriptions/00000000-0000-0000-0000-000000000000",
        status: "Enabled",
        userRoleAssignments: {
          "e45e3m7c-176e-416a-b466-0c5ec8298f8a": {
            roles: { "4cbf0b6c-e750-441c-98a7-10da8387e4d6": {} },
          },
        },
      },
      tags: { CostCenter: "RnD" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await projectEnvironmentTypesCreateOrUpdate();
}

main().catch(console.error);
