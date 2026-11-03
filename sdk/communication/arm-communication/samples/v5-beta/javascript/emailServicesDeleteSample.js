// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CommunicationServiceManagementClient } = require("@azure/arm-communication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to operation to delete a EmailService.
 *
 * @summary operation to delete a EmailService.
 * x-ms-original-file: 2026-03-18/emailServices/delete.json
 */
async function deleteEmailServiceResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  await client.emailServices.delete("MyResourceGroup", "MyEmailServiceResource");
}

async function main() {
  await deleteEmailServiceResource();
}

main().catch(console.error);
