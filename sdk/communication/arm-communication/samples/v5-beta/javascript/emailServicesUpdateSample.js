// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CommunicationServiceManagementClient } = require("@azure/arm-communication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to operation to update an existing EmailService.
 *
 * @summary operation to update an existing EmailService.
 * x-ms-original-file: 2026-03-18/emailServices/update.json
 */
async function updateEmailServiceResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.emailServices.update("MyResourceGroup", "MyEmailServiceResource", {
    tags: { newTag: "newVal" },
  });
  console.log(result);
}

async function main() {
  await updateEmailServiceResource();
}

main().catch(console.error);
