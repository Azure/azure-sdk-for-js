// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an automation account.
 *
 * @summary delete an automation account.
 * x-ms-original-file: 2024-10-23/deleteAutomationAccount.json
 */
async function deleteAutomationAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.automationAccount.delete("rg", "myAutomationAccount9");
}

async function main(): Promise<void> {
  await deleteAutomationAccount();
}

main().catch(console.error);
