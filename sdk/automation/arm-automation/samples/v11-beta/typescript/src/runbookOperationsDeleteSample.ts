// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the runbook by name.
 *
 * @summary delete the runbook by name.
 * x-ms-original-file: 2024-10-23/runbook/deleteRunbook.json
 */
async function deleteARunbook(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.runbookOperations.delete("rg", "ContoseAutomationAccount", "Get-AzureVMTutorial");
}

async function main(): Promise<void> {
  await deleteARunbook();
}

main().catch(console.error);
