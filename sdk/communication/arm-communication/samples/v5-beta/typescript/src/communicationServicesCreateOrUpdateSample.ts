// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a new CommunicationService or update an existing CommunicationService.
 *
 * @summary create a new CommunicationService or update an existing CommunicationService.
 * x-ms-original-file: 2026-03-18/communicationServices/createOrUpdate.json
 */
async function createOrUpdateResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.communicationServices.createOrUpdate(
    "MyResourceGroup",
    "MyCommunicationResource",
    { location: "Global", dataLocation: "United States" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a new CommunicationService or update an existing CommunicationService.
 *
 * @summary create a new CommunicationService or update an existing CommunicationService.
 * x-ms-original-file: 2026-03-18/communicationServices/createOrUpdateWithDisableLocalAuth.json
 */
async function createOrUpdateResourceWithDisableLocalAuth(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.communicationServices.createOrUpdate(
    "MyResourceGroup",
    "MyCommunicationResource",
    { location: "Global", dataLocation: "United States", disableLocalAuth: true },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a new CommunicationService or update an existing CommunicationService.
 *
 * @summary create a new CommunicationService or update an existing CommunicationService.
 * x-ms-original-file: 2026-03-18/communicationServices/createOrUpdateWithPublicNetworkAccess.json
 */
async function createOrUpdateResourceWithPublicNetworkAccess(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.communicationServices.createOrUpdate(
    "MyResourceGroup",
    "MyCommunicationResource",
    { location: "Global", dataLocation: "United States", publicNetworkAccess: "Enabled" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a new CommunicationService or update an existing CommunicationService.
 *
 * @summary create a new CommunicationService or update an existing CommunicationService.
 * x-ms-original-file: 2026-03-18/communicationServices/createOrUpdateWithSystemAssignedIdentity.json
 */
async function createOrUpdateResourceWithManagedIdentity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.communicationServices.createOrUpdate(
    "MyResourceGroup",
    "MyCommunicationResource",
    { identity: { type: "SystemAssigned" }, location: "Global", dataLocation: "United States" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateResource();
  await createOrUpdateResourceWithDisableLocalAuth();
  await createOrUpdateResourceWithPublicNetworkAccess();
  await createOrUpdateResourceWithManagedIdentity();
}

main().catch(console.error);
