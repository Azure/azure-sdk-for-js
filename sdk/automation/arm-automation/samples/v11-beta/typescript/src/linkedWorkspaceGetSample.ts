// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve the linked workspace for the account id.
 *
 * @summary retrieve the linked workspace for the account id.
 * x-ms-original-file: 2024-10-23/getLinkedWorkspace.json
 */
async function getTheLinkedWorkspaceOfAnAutomationAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.linkedWorkspace.get("rg", "ContosoAutomationAccount");
  console.log(result);
}

async function main(): Promise<void> {
  await getTheLinkedWorkspaceOfAnAutomationAccount();
}

main().catch(console.error);
