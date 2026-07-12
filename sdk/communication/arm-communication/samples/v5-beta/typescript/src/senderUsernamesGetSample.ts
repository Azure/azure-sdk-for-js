// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a valid sender username for a domains resource.
 *
 * @summary get a valid sender username for a domains resource.
 * x-ms-original-file: 2026-03-18/senderUsernames/get.json
 */
async function getSenderUsernamesResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.senderUsernames.get(
    "contosoResourceGroup",
    "contosoEmailService",
    "contoso.com",
    "contosoNewsAlerts",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getSenderUsernamesResource();
}

main().catch(console.error);
