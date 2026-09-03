// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CommunicationServiceManagementClient } = require("@azure/arm-communication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a SmtpUsernameResource.
 *
 * @summary get a SmtpUsernameResource.
 * x-ms-original-file: 2026-03-18/smtpUsername/get.json
 */
async function getASmtpUsernameResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.smtpUsernames.get(
    "contosoResourceGroup",
    "contosoACSService",
    "smtpusername1",
  );
  console.log(result);
}

async function main() {
  await getASmtpUsernameResource();
}

main().catch(console.error);
