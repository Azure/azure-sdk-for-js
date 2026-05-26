// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CommunicationServiceManagementClient } = require("@azure/arm-communication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all valid sender usernames for a domains resource.
 *
 * @summary list all valid sender usernames for a domains resource.
 * x-ms-original-file: 2026-03-18/senderUsernames/listByDomain.json
 */
async function getSenderUsernamesResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.senderUsernames.listByDomains(
    "contosoResourceGroup",
    "contosoEmailService",
    "contoso.com",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getSenderUsernamesResource();
}

main().catch(console.error);
