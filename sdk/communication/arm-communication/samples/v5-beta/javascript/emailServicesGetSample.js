// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CommunicationServiceManagementClient } = require("@azure/arm-communication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the EmailService and its properties.
 *
 * @summary get the EmailService and its properties.
 * x-ms-original-file: 2026-03-18/emailServices/get.json
 */
async function getEmailServiceResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.emailServices.get("MyResourceGroup", "MyEmailServiceResource");
  console.log(result);
}

async function main() {
  await getEmailServiceResource();
}

main().catch(console.error);
