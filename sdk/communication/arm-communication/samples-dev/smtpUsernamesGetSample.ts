// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a SmtpUsernameResource.
 *
 * @summary get a SmtpUsernameResource.
 * x-ms-original-file: 2026-03-18/smtpUsername/get.json
 */
async function getASmtpUsernameResource(): Promise<void> {
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

async function main(): Promise<void> {
  await getASmtpUsernameResource();
}

main().catch(console.error);
