// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get information about an Automation Account.
 *
 * @summary get information about an Automation Account.
 * x-ms-original-file: 2024-10-23/getAutomationAccount.json
 */
async function getAutomationAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.automationAccount.get("rg", "myAutomationAccount9");
  console.log(result);
}

async function main(): Promise<void> {
  await getAutomationAccount();
}

main().catch(console.error);
