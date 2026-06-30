// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve the content of runbook draft identified by runbook name.
 *
 * @summary retrieve the content of runbook draft identified by runbook name.
 * x-ms-original-file: 2024-10-23/runbook/getRunbookDraftContent.json
 */
async function getRunbookDraftContent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.runbookDraftOperations.getContent(
    "rg",
    "ContoseAutomationAccount",
    "Get-AzureVMTutorial",
  );
  console.log(result);
}

async function main() {
  await getRunbookDraftContent();
}

main().catch(console.error);
