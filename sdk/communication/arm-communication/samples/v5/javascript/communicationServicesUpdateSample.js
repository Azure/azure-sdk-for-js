// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CommunicationServiceManagementClient } = require("@azure/arm-communication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to operation to update an existing CommunicationService.
 *
 * @summary operation to update an existing CommunicationService.
 * x-ms-original-file: 2026-03-18/communicationServices/update.json
 */
async function updateResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.communicationServices.update(
    "MyResourceGroup",
    "MyCommunicationResource",
    { tags: { newTag: "newVal" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to operation to update an existing CommunicationService.
 *
 * @summary operation to update an existing CommunicationService.
 * x-ms-original-file: 2026-03-18/communicationServices/updateRemoveSystemIdentity.json
 */
async function updateResourceToRemoveIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.communicationServices.update(
    "MyResourceGroup",
    "MyCommunicationResource",
    { identity: { type: "None" }, tags: { newTag: "newVal" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to operation to update an existing CommunicationService.
 *
 * @summary operation to update an existing CommunicationService.
 * x-ms-original-file: 2026-03-18/communicationServices/updateWithDisableLocalAuth.json
 */
async function updateResourceToAddDisableLocalAuth() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.communicationServices.update(
    "MyResourceGroup",
    "MyCommunicationResource",
    { disableLocalAuth: true, tags: { newTag: "newVal" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to operation to update an existing CommunicationService.
 *
 * @summary operation to update an existing CommunicationService.
 * x-ms-original-file: 2026-03-18/communicationServices/updateWithPublicNetworkAccess.json
 */
async function updateResourceToAddPublicNetworkAccess() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.communicationServices.update(
    "MyResourceGroup",
    "MyCommunicationResource",
    { publicNetworkAccess: "Enabled", tags: { newTag: "newVal" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to operation to update an existing CommunicationService.
 *
 * @summary operation to update an existing CommunicationService.
 * x-ms-original-file: 2026-03-18/communicationServices/updateWithSystemAndUserIdentity.json
 */
async function updateResourceToAddSystemAndUserManagedIdentities() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.communicationServices.update(
    "MyResourceGroup",
    "MyCommunicationResource",
    {
      identity: {
        type: "SystemAssigned,UserAssigned",
        userAssignedIdentities: { "/user/assigned/resource/id": {} },
      },
      tags: { newTag: "newVal" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to operation to update an existing CommunicationService.
 *
 * @summary operation to update an existing CommunicationService.
 * x-ms-original-file: 2026-03-18/communicationServices/updateWithSystemAssignedIdentity.json
 */
async function updateResourceToAddASystemAssignedManagedIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.communicationServices.update(
    "MyResourceGroup",
    "MyCommunicationResource",
    { identity: { type: "SystemAssigned" }, tags: { newTag: "newVal" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to operation to update an existing CommunicationService.
 *
 * @summary operation to update an existing CommunicationService.
 * x-ms-original-file: 2026-03-18/communicationServices/updateWithUserAssignedIdentity.json
 */
async function updateResourceToAddAUserAssignedManagedIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.communicationServices.update(
    "MyResourceGroup",
    "MyCommunicationResource",
    {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: { "/user/assigned/resource/id": {} },
      },
      tags: { newTag: "newVal" },
    },
  );
  console.log(result);
}

async function main() {
  await updateResource();
  await updateResourceToRemoveIdentity();
  await updateResourceToAddDisableLocalAuth();
  await updateResourceToAddPublicNetworkAccess();
  await updateResourceToAddSystemAndUserManagedIdentities();
  await updateResourceToAddASystemAssignedManagedIdentity();
  await updateResourceToAddAUserAssignedManagedIdentity();
}

main().catch(console.error);
