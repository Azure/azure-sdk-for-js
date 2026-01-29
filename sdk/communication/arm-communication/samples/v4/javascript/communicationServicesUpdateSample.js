// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CommunicationServiceManagementClient } = require("@azure/arm-communication");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Operation to update an existing CommunicationService.
 *
 * @summary Operation to update an existing CommunicationService.
 * x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2025-09-01/examples/communicationServices/update.json
 */
async function updateResource() {
  const subscriptionId =
    process.env["COMMUNICATION_SUBSCRIPTION_ID"] || "11112222-3333-4444-5555-666677778888";
  const resourceGroupName = process.env["COMMUNICATION_RESOURCE_GROUP"] || "MyResourceGroup";
  const communicationServiceName = "MyCommunicationResource";
  const parameters = {
    tags: { newTag: "newVal" },
  };
  const credential = new DefaultAzureCredential();
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.communicationServices.update(
    resourceGroupName,
    communicationServiceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Operation to update an existing CommunicationService.
 *
 * @summary Operation to update an existing CommunicationService.
 * x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2025-09-01/examples/communicationServices/updateWithDisableLocalAuth.json
 */
async function updateResourceToAddDisableLocalAuth() {
  const subscriptionId =
    process.env["COMMUNICATION_SUBSCRIPTION_ID"] || "11112222-3333-4444-5555-666677778888";
  const resourceGroupName = process.env["COMMUNICATION_RESOURCE_GROUP"] || "MyResourceGroup";
  const communicationServiceName = "MyCommunicationResource";
  const parameters = {
    disableLocalAuth: true,
    tags: { newTag: "newVal" },
  };
  const credential = new DefaultAzureCredential();
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.communicationServices.update(
    resourceGroupName,
    communicationServiceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Operation to update an existing CommunicationService.
 *
 * @summary Operation to update an existing CommunicationService.
 * x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2025-09-01/examples/communicationServices/updateWithPublicNetworkAccess.json
 */
async function updateResourceToAddPublicNetworkAccess() {
  const subscriptionId =
    process.env["COMMUNICATION_SUBSCRIPTION_ID"] || "11112222-3333-4444-5555-666677778888";
  const resourceGroupName = process.env["COMMUNICATION_RESOURCE_GROUP"] || "MyResourceGroup";
  const communicationServiceName = "MyCommunicationResource";
  const parameters = {
    publicNetworkAccess: "Enabled",
    tags: { newTag: "newVal" },
  };
  const credential = new DefaultAzureCredential();
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.communicationServices.update(
    resourceGroupName,
    communicationServiceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Operation to update an existing CommunicationService.
 *
 * @summary Operation to update an existing CommunicationService.
 * x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2025-09-01/examples/communicationServices/updateWithSystemAndUserIdentity.json
 */
async function updateResourceToAddSystemAndUserManagedIdentities() {
  const subscriptionId =
    process.env["COMMUNICATION_SUBSCRIPTION_ID"] || "11112222-3333-4444-5555-666677778888";
  const resourceGroupName = process.env["COMMUNICATION_RESOURCE_GROUP"] || "MyResourceGroup";
  const communicationServiceName = "MyCommunicationResource";
  const parameters = {
    identity: {
      type: "SystemAssigned,UserAssigned",
      userAssignedIdentities: { "/user/assigned/resource/id": {} },
    },
    tags: { newTag: "newVal" },
  };
  const credential = new DefaultAzureCredential();
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.communicationServices.update(
    resourceGroupName,
    communicationServiceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Operation to update an existing CommunicationService.
 *
 * @summary Operation to update an existing CommunicationService.
 * x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2025-09-01/examples/communicationServices/updateWithSystemAssignedIdentity.json
 */
async function updateResourceToAddASystemAssignedManagedIdentity() {
  const subscriptionId =
    process.env["COMMUNICATION_SUBSCRIPTION_ID"] || "11112222-3333-4444-5555-666677778888";
  const resourceGroupName = process.env["COMMUNICATION_RESOURCE_GROUP"] || "MyResourceGroup";
  const communicationServiceName = "MyCommunicationResource";
  const parameters = {
    identity: { type: "SystemAssigned" },
    tags: { newTag: "newVal" },
  };
  const credential = new DefaultAzureCredential();
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.communicationServices.update(
    resourceGroupName,
    communicationServiceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Operation to update an existing CommunicationService.
 *
 * @summary Operation to update an existing CommunicationService.
 * x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2025-09-01/examples/communicationServices/updateWithUserAssignedIdentity.json
 */
async function updateResourceToAddAUserAssignedManagedIdentity() {
  const subscriptionId =
    process.env["COMMUNICATION_SUBSCRIPTION_ID"] || "11112222-3333-4444-5555-666677778888";
  const resourceGroupName = process.env["COMMUNICATION_RESOURCE_GROUP"] || "MyResourceGroup";
  const communicationServiceName = "MyCommunicationResource";
  const parameters = {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: { "/user/assigned/resource/id": {} },
    },
    tags: { newTag: "newVal" },
  };
  const credential = new DefaultAzureCredential();
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.communicationServices.update(
    resourceGroupName,
    communicationServiceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Operation to update an existing CommunicationService.
 *
 * @summary Operation to update an existing CommunicationService.
 * x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2025-09-01/examples/communicationServices/updateRemoveSystemIdentity.json
 */
async function updateResourceToRemoveIdentity() {
  const subscriptionId =
    process.env["COMMUNICATION_SUBSCRIPTION_ID"] || "11112222-3333-4444-5555-666677778888";
  const resourceGroupName = process.env["COMMUNICATION_RESOURCE_GROUP"] || "MyResourceGroup";
  const communicationServiceName = "MyCommunicationResource";
  const parameters = {
    identity: { type: "None" },
    tags: { newTag: "newVal" },
  };
  const credential = new DefaultAzureCredential();
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.communicationServices.update(
    resourceGroupName,
    communicationServiceName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await updateResource();
  await updateResourceToAddDisableLocalAuth();
  await updateResourceToAddPublicNetworkAccess();
  await updateResourceToAddSystemAndUserManagedIdentities();
  await updateResourceToAddASystemAssignedManagedIdentity();
  await updateResourceToAddAUserAssignedManagedIdentity();
  await updateResourceToRemoveIdentity();
}

main().catch(console.error);
