// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create the webhook identified by webhook name.
 *
 * @summary create the webhook identified by webhook name.
 * x-ms-original-file: 2024-10-23/createOrUpdateWebhook.json
 */
async function createOrUpdateWebhook(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.webhook.createOrUpdate("rg", "myAutomationAccount33", "TestWebhook", {
    name: "TestWebhook",
    expiryTime: new Date("2018-03-29T22:18:13.7002872Z"),
    isEnabled: true,
    runbook: { name: "TestRunbook" },
    uri: "<uri>",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateWebhook();
}

main().catch(console.error);
