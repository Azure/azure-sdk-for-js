// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CommunicationServiceManagementClient } = require("@azure/arm-communication");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Create a new CommunicationService or update an existing CommunicationService.
 *
 * @summary Create a new CommunicationService or update an existing CommunicationService.
 * x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2025-09-01/examples/communicationServices/createOrUpdate.json
 */
async function createOrUpdateResource() {
  const subscriptionId =
    process.env["COMMUNICATION_SUBSCRIPTION_ID"] || "11112222-3333-4444-5555-666677778888";
  const resourceGroupName = process.env["COMMUNICATION_RESOURCE_GROUP"] || "MyResourceGroup";
  const communicationServiceName = "MyCommunicationResource";
  const parameters = {
    dataLocation: "United States",
    location: "Global",
  };
  const credential = new DefaultAzureCredential();
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.communicationServices.beginCreateOrUpdateAndWait(
    resourceGroupName,
    communicationServiceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create a new CommunicationService or update an existing CommunicationService.
 *
 * @summary Create a new CommunicationService or update an existing CommunicationService.
 * x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2025-09-01/examples/communicationServices/createOrUpdateWithDisableLocalAuth.json
 */
async function createOrUpdateResourceWithDisableLocalAuth() {
  const subscriptionId =
    process.env["COMMUNICATION_SUBSCRIPTION_ID"] || "11112222-3333-4444-5555-666677778888";
  const resourceGroupName = process.env["COMMUNICATION_RESOURCE_GROUP"] || "MyResourceGroup";
  const communicationServiceName = "MyCommunicationResource";
  const parameters = {
    dataLocation: "United States",
    disableLocalAuth: true,
    location: "Global",
  };
  const credential = new DefaultAzureCredential();
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.communicationServices.beginCreateOrUpdateAndWait(
    resourceGroupName,
    communicationServiceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create a new CommunicationService or update an existing CommunicationService.
 *
 * @summary Create a new CommunicationService or update an existing CommunicationService.
 * x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2025-09-01/examples/communicationServices/createOrUpdateWithPublicNetworkAccess.json
 */
async function createOrUpdateResourceWithPublicNetworkAccess() {
  const subscriptionId =
    process.env["COMMUNICATION_SUBSCRIPTION_ID"] || "11112222-3333-4444-5555-666677778888";
  const resourceGroupName = process.env["COMMUNICATION_RESOURCE_GROUP"] || "MyResourceGroup";
  const communicationServiceName = "MyCommunicationResource";
  const parameters = {
    dataLocation: "United States",
    location: "Global",
    publicNetworkAccess: "Enabled",
  };
  const credential = new DefaultAzureCredential();
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.communicationServices.beginCreateOrUpdateAndWait(
    resourceGroupName,
    communicationServiceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create a new CommunicationService or update an existing CommunicationService.
 *
 * @summary Create a new CommunicationService or update an existing CommunicationService.
 * x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2025-09-01/examples/communicationServices/createOrUpdateWithSystemAssignedIdentity.json
 */
async function createOrUpdateResourceWithManagedIdentity() {
  const subscriptionId =
    process.env["COMMUNICATION_SUBSCRIPTION_ID"] || "11112222-3333-4444-5555-666677778888";
  const resourceGroupName = process.env["COMMUNICATION_RESOURCE_GROUP"] || "MyResourceGroup";
  const communicationServiceName = "MyCommunicationResource";
  const parameters = {
    dataLocation: "United States",
    identity: { type: "SystemAssigned" },
    location: "Global",
  };
  const credential = new DefaultAzureCredential();
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.communicationServices.beginCreateOrUpdateAndWait(
    resourceGroupName,
    communicationServiceName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createOrUpdateResource();
  await createOrUpdateResourceWithDisableLocalAuth();
  await createOrUpdateResourceWithPublicNetworkAccess();
  await createOrUpdateResourceWithManagedIdentity();
}

main().catch(console.error);
