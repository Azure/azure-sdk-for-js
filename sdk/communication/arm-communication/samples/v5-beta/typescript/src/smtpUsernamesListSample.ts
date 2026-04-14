// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get all SmtpUsernameResources for a Communication resource.
 *
 * @summary get all SmtpUsernameResources for a Communication resource.
 * x-ms-original-file: 2026-03-18/smtpUsername/getAll.json
 */
async function getAllSmtpUsernameResourcesForACommunicationServiceResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.smtpUsernames.list("contosoResourceGroup", "contosoACSService")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAllSmtpUsernameResourcesForACommunicationServiceResource();
}

main().catch(console.error);
