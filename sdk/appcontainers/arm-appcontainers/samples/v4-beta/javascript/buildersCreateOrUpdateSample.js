// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a BuilderResource
 *
 * @summary create or update a BuilderResource
 * x-ms-original-file: 2025-10-02-preview/Builders_CreateOrUpdate.json
 */
async function buildersCreateOrUpdate0() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.builders.createOrUpdate("rg", "testBuilder", {
    identity: {
      type: "SystemAssigned,UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity1":
          {},
      },
    },
    location: "eastus",
    containerRegistries: [
      {
        containerRegistryServer: "test.azurecr.io",
        identityResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity1",
      },
      {
        containerRegistryServer: "test2.azurecr.io",
        identityResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity1",
      },
    ],
    environmentId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/rg/providers/Microsoft.App/managedEnvironments/testEnv",
    tags: { company: "Microsoft" },
  });
  console.log(result);
}

async function main() {
  await buildersCreateOrUpdate0();
}

main().catch(console.error);
