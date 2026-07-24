// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a devcenter resource.
 *
 * @summary creates or updates a devcenter resource.
 * x-ms-original-file: 2026-01-01-preview/DevCenters_Create.json
 */
async function devCentersCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.devCenters.createOrUpdate("rg1", "Contoso", {
    location: "centralus",
    devBoxProvisioningSettings: { installAzureMonitorAgentEnableStatus: "Enabled" },
    displayName: "ContosoDevCenter",
    projectCatalogSettings: { catalogItemSyncEnableStatus: "Enabled" },
    tags: { CostCode: "12345" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a devcenter resource.
 *
 * @summary creates or updates a devcenter resource.
 * x-ms-original-file: 2026-01-01-preview/DevCenters_CreateWithDisabledManagedNetworks.json
 */
async function devCentersCreateWithDisabledManagedNetworks() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.devCenters.createOrUpdate("rg1", "Contoso", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/identityGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/testidentity1":
          {},
      },
    },
    location: "centralus",
    displayName: "ContosoDevCenter",
    networkSettings: { microsoftHostedNetworkEnableStatus: "Disabled" },
    tags: { CostCode: "12345" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a devcenter resource.
 *
 * @summary creates or updates a devcenter resource.
 * x-ms-original-file: 2026-01-01-preview/DevCenters_CreateWithEncryption.json
 */
async function devCentersCreateWithEncryption() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.devCenters.createOrUpdate("rg1", "Contoso", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/identityGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/testidentity1":
          {},
      },
    },
    location: "centralus",
    displayName: "ContosoDevCenter",
    encryption: {
      customerManagedKeyEncryption: {
        keyEncryptionKeyIdentity: {
          identityType: "userAssignedIdentity",
          userAssignedIdentityResourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/identityGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/testidentity1",
        },
        keyEncryptionKeyUrl: "https://contosovault.vault.azure.net/keys/contosokek",
      },
    },
    tags: { CostCode: "12345" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a devcenter resource.
 *
 * @summary creates or updates a devcenter resource.
 * x-ms-original-file: 2026-01-01-preview/DevCenters_CreateWithUserIdentity.json
 */
async function devCentersCreateWithUserIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.devCenters.createOrUpdate("rg1", "Contoso", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/identityGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/testidentity1":
          {},
      },
    },
    location: "centralus",
    displayName: "ContosoDevCenter",
    tags: { CostCode: "12345" },
  });
  console.log(result);
}

async function main() {
  await devCentersCreate();
  await devCentersCreateWithDisabledManagedNetworks();
  await devCentersCreateWithEncryption();
  await devCentersCreateWithUserIdentity();
}

main().catch(console.error);
