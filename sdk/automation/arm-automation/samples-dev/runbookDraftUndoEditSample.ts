// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to undo draft edit to last known published state identified by runbook name.
 *
 * @summary undo draft edit to last known published state identified by runbook name.
 * x-ms-original-file: 2024-10-23/runbook/undoDraftEditToLastKnownPublishedState.json
 */
async function undoDraftEditToLastKnownPublishedState(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.runbookDraft.undoEdit(
    "rg",
    "ContoseAutomationAccount",
    "Get-AzureVMTutorial",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await undoDraftEditToLastKnownPublishedState();
}

main().catch(console.error);
