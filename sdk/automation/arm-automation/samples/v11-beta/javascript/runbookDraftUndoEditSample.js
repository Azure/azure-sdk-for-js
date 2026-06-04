// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to undo draft edit to last known published state identified by runbook name.
 *
 * @summary undo draft edit to last known published state identified by runbook name.
 * x-ms-original-file: 2024-10-23/runbook/undoDraftEditToLastKnownPublishedState.json
 */
async function undoDraftEditToLastKnownPublishedState() {
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

async function main() {
  await undoDraftEditToLastKnownPublishedState();
}

main().catch(console.error);
