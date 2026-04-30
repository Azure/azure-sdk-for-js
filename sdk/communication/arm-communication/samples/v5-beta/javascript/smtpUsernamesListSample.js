// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CommunicationServiceManagementClient } = require("@azure/arm-communication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all SmtpUsernameResources for a Communication resource.
 *
 * @summary get all SmtpUsernameResources for a Communication resource.
 * x-ms-original-file: 2026-03-18/smtpUsername/getAll.json
 */
async function getAllSmtpUsernameResourcesForACommunicationServiceResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.smtpUsernames.list("contosoResourceGroup", "contosoACSService")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllSmtpUsernameResourcesForACommunicationServiceResource();
}

main().catch(console.error);
