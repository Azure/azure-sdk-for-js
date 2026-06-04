// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generates a Uri for use in creating a webhook.
 *
 * @summary generates a Uri for use in creating a webhook.
 * x-ms-original-file: 2024-10-23/webhookGenerateUri.json
 */
async function generateWebhookUri(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.webhook.generateUri("rg", "myAutomationAccount33");
  console.log(result);
}

async function main(): Promise<void> {
  await generateWebhookUri();
}

main().catch(console.error);
