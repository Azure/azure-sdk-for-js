// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to operation to delete a CommunicationService.
 *
 * @summary operation to delete a CommunicationService.
 * x-ms-original-file: 2026-03-18/communicationServices/delete.json
 */
async function deleteResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  await client.communicationServices.delete("MyResourceGroup", "MyCommunicationResource");
}

async function main(): Promise<void> {
  await deleteResource();
}

main().catch(console.error);
