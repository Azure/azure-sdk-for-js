// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent.
 *
 * @summary creates or updates a namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent.
 * x-ms-original-file: 2026-01-01/NameSpaces/EHNameSpaceCreate.json
 */
async function namespaceCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "SampleSubscription";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.namespaces.createOrUpdate("ResurceGroupSample", "NamespaceSample", {
    identity: {
      type: "SystemAssigned, UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/SampleSubscription/resourceGroups/ResurceGroupSample/providers/Microsoft.ManagedIdentity/userAssignedIdentities/ud1":
          {},
        "/subscriptions/SampleSubscription/resourceGroups/ResurceGroupSample/providers/Microsoft.ManagedIdentity/userAssignedIdentities/ud2":
          {},
      },
    },
    location: "East US",
    clusterArmId:
      "/subscriptions/SampleSubscription/resourceGroups/ResurceGroupSample/providers/Microsoft.EventHub/clusters/enc-test",
    encryption: {
      keySource: "Microsoft.KeyVault",
      keyVaultProperties: [
        {
          identity: {
            userAssignedIdentity:
              "/subscriptions/SampleSubscription/resourceGroups/ResurceGroupSample/providers/Microsoft.ManagedIdentity/userAssignedIdentities/ud1",
          },
          keyName: "Samplekey",
          keyVaultUri: "https://aprao-keyvault-user.vault-int.azure-int.net/",
        },
      ],
    },
    geoDataReplication: {
      locations: [
        { locationName: "eastus", roleType: "Primary" },
        { locationName: "southcentralus", roleType: "Secondary" },
      ],
      maxReplicationLagDurationInSeconds: 300,
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent.
 *
 * @summary creates or updates a namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent.
 * x-ms-original-file: 2026-01-01/NameSpaces/NamespaceWithGeoDRCreate.json
 */
async function namespaceWithGeoDRCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "SampleSubscription";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.namespaces.createOrUpdate(
    "ResurceGroupSample",
    "NamespaceGeoDRCreateSample",
    {
      location: "East US",
      geoDataReplication: {
        locations: [
          { locationName: "eastus", roleType: "Primary" },
          { locationName: "westus", roleType: "Secondary" },
          { locationName: "centralus", roleType: "Secondary" },
        ],
        maxReplicationLagDurationInSeconds: 60,
      },
    },
  );
  console.log(result);
}

async function main() {
  await namespaceCreate();
  await namespaceWithGeoDRCreate();
}

main().catch(console.error);
