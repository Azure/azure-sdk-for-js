// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CommunicationServiceManagementClient } = require("@azure/arm-communication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to operation to delete a CommunicationService.
 *
 * @summary operation to delete a CommunicationService.
 * x-ms-original-file: 2026-03-18/communicationServices/delete.json
 */
async function deleteResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  await client.communicationServices.delete("MyResourceGroup", "MyCommunicationResource");
}

async function main() {
  await deleteResource();
}

main().catch(console.error);
