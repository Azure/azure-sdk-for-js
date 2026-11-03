// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the webhook by name.
 *
 * @summary delete the webhook by name.
 * x-ms-original-file: 2024-10-23/deleteWebhook.json
 */
async function deleteWebhook(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.webhookOperations.delete("rg", "myAutomationAccount33", "TestWebhook");
}

async function main(): Promise<void> {
  await deleteWebhook();
}

main().catch(console.error);
