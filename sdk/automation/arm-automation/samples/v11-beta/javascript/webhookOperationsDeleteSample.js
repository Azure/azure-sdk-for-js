// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the webhook by name.
 *
 * @summary delete the webhook by name.
 * x-ms-original-file: 2024-10-23/deleteWebhook.json
 */
async function deleteWebhook() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.webhookOperations.delete("rg", "myAutomationAccount33", "TestWebhook");
}

async function main() {
  await deleteWebhook();
}

main().catch(console.error);
