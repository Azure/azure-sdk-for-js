// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve the runbook draft identified by runbook name.
 *
 * @summary retrieve the runbook draft identified by runbook name.
 * x-ms-original-file: 2024-10-23/runbook/getRunbookDraft.json
 */
async function getRunbookDraft(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.runbookDraftOperations.get(
    "rg",
    "ContoseAutomationAccount",
    "Get-AzureVMTutorial",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getRunbookDraft();
}

main().catch(console.error);
