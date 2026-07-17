// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve deleted automation account.
 *
 * @summary retrieve deleted automation account.
 * x-ms-original-file: 2024-10-23/getDeletedAutomationAccount.json
 */
async function getDeletedAutomationAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.deletedAutomationAccounts.listBySubscription();
  console.log(result);
}

async function main(): Promise<void> {
  await getDeletedAutomationAccount();
}

main().catch(console.error);
