// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to add a new SenderUsername resource under the parent Domains resource or update an existing SenderUsername resource.
 *
 * @summary add a new SenderUsername resource under the parent Domains resource or update an existing SenderUsername resource.
 * x-ms-original-file: 2026-03-18/senderUsernames/createOrUpdate.json
 */
async function createOrUpdateSenderUsernamesResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.senderUsernames.createOrUpdate(
    "contosoResourceGroup",
    "contosoEmailService",
    "contoso.com",
    "contosoNewsAlerts",
    { displayName: "Contoso News Alerts", username: "contosoNewsAlerts" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateSenderUsernamesResource();
}

main().catch(console.error);
