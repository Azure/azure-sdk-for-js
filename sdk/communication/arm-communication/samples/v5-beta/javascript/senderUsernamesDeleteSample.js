// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CommunicationServiceManagementClient } = require("@azure/arm-communication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to operation to delete a SenderUsernames resource.
 *
 * @summary operation to delete a SenderUsernames resource.
 * x-ms-original-file: 2026-03-18/senderUsernames/delete.json
 */
async function deleteSenderUsernamesResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  await client.senderUsernames.delete(
    "MyResourceGroup",
    "MyEmailServiceResource",
    "mydomain.com",
    "contosoNewsAlerts",
  );
}

async function main() {
  await deleteSenderUsernamesResource();
}

main().catch(console.error);
