// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to operation to delete a EmailService.
 *
 * @summary operation to delete a EmailService.
 * x-ms-original-file: 2026-03-18/emailServices/delete.json
 */
async function deleteEmailServiceResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  await client.emailServices.delete("MyResourceGroup", "MyEmailServiceResource");
}

async function main(): Promise<void> {
  await deleteEmailServiceResource();
}

main().catch(console.error);
