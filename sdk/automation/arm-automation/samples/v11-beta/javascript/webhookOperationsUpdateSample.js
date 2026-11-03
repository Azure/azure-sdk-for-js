// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the webhook identified by webhook name.
 *
 * @summary update the webhook identified by webhook name.
 * x-ms-original-file: 2024-10-23/updateWebhook.json
 */
async function updateWebhook() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.webhookOperations.update(
    "rg",
    "myAutomationAccount33",
    "TestWebhook",
    { name: "TestWebhook", description: "updated webhook", isEnabled: false },
  );
  console.log(result);
}

async function main() {
  await updateWebhook();
}

main().catch(console.error);
