// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve the webhook identified by webhook name.
 *
 * @summary retrieve the webhook identified by webhook name.
 * x-ms-original-file: 2024-10-23/getWebhook.json
 */
async function getWebhook(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.webhookOperations.get("rg", "myAutomationAccount33", "TestWebhook");
  console.log(result);
}

async function main(): Promise<void> {
  await getWebhook();
}

main().catch(console.error);
