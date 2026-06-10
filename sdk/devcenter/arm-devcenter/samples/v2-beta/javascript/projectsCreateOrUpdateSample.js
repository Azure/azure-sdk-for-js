// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a project.
 *
 * @summary creates or updates a project.
 * x-ms-original-file: 2026-01-01-preview/Projects_Put.json
 */
async function projectsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.projects.createOrUpdate("rg1", "DevProject", {
    location: "centralus",
    properties: {
      description: "This is my first project.",
      devCenterId:
        "/subscriptions/0ac520ee-14c0-480f-b6c9-0a90c58ffff/resourceGroups/rg1/providers/Microsoft.DevCenter/devcenters/Contoso",
      displayName: "Dev",
      assignedGroups: [
        { objectId: "11111111-1111-1111-1111-111111111111", scope: "DevBox" },
        { objectId: "22222222-2222-2222-2222-222222222222", scope: "DevBox" },
      ],
    },
    tags: { CostCenter: "R&D" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a project.
 *
 * @summary creates or updates a project.
 * x-ms-original-file: 2026-01-01-preview/Projects_PutWithCustomizationSettings.json
 */
async function projectsCreateOrUpdateWithCustomizationSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.projects.createOrUpdate("rg1", "DevProject", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/identityGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/testidentity1":
          {},
      },
    },
    location: "centralus",
    properties: {
      description: "This is my first project.",
      customizationSettings: {
        identities: [
          {
            identityResourceId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/identityGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/testidentity1",
            identityType: "userAssignedIdentity",
          },
        ],
      },
      devCenterId:
        "/subscriptions/0ac520ee-14c0-480f-b6c9-0a90c58ffff/resourceGroups/rg1/providers/Microsoft.DevCenter/devcenters/Contoso",
    },
    tags: { CostCenter: "R&D" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a project.
 *
 * @summary creates or updates a project.
 * x-ms-original-file: 2026-01-01-preview/Projects_PutWithCustomizationSettings_SystemIdentity.json
 */
async function projectsCreateOrUpdateWithCustomizationSettingsSystemIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.projects.createOrUpdate("rg1", "DevProject", {
    identity: { type: "SystemAssigned" },
    location: "centralus",
    properties: {
      description: "This is my first project.",
      customizationSettings: { identities: [{ identityType: "systemAssignedIdentity" }] },
      devCenterId:
        "/subscriptions/0ac520ee-14c0-480f-b6c9-0a90c58ffff/resourceGroups/rg1/providers/Microsoft.DevCenter/devcenters/Contoso",
    },
    tags: { CostCenter: "R&D" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a project.
 *
 * @summary creates or updates a project.
 * x-ms-original-file: 2026-01-01-preview/Projects_PutWithMaxDevBoxPerUser.json
 */
async function projectsCreateOrUpdateWithLimitsPerDev() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.projects.createOrUpdate("rg1", "DevProject", {
    location: "centralus",
    properties: {
      description: "This is my first project.",
      devCenterId:
        "/subscriptions/0ac520ee-14c0-480f-b6c9-0a90c58ffff/resourceGroups/rg1/providers/Microsoft.DevCenter/devcenters/Contoso",
      maxDevBoxesPerUser: 3,
    },
    tags: { CostCenter: "R&D" },
  });
  console.log(result);
}

async function main() {
  await projectsCreateOrUpdate();
  await projectsCreateOrUpdateWithCustomizationSettings();
  await projectsCreateOrUpdateWithCustomizationSettingsSystemIdentity();
  await projectsCreateOrUpdateWithLimitsPerDev();
}

main().catch(console.error);
