// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the runbook by name.
 *
 * @summary delete the runbook by name.
 * x-ms-original-file: 2024-10-23/runbook/deleteRunbook.json
 */
async function deleteARunbook() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.runbookOperations.delete("rg", "ContoseAutomationAccount", "Get-AzureVMTutorial");
}

async function main() {
  await deleteARunbook();
}

main().catch(console.error);
