// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve the automation keys for an account.
 *
 * @summary retrieve the automation keys for an account.
 * x-ms-original-file: 2024-10-23/listAutomationAccountKeys.json
 */
async function getListsOfAnAutomationAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.keys.listByAutomationAccount("rg", "MyAutomationAccount");
  console.log(result);
}

async function main(): Promise<void> {
  await getListsOfAnAutomationAccount();
}

main().catch(console.error);
