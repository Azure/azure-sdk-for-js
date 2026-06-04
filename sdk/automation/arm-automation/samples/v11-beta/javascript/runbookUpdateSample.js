// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the runbook identified by runbook name.
 *
 * @summary update the runbook identified by runbook name.
 * x-ms-original-file: 2024-10-23/runbook/updateRunbook.json
 */
async function updateRunbook() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.runbook.update(
    "rg",
    "ContoseAutomationAccount",
    "Get-AzureVMTutorial",
    {
      description: "Updated Description of the Runbook",
      logActivityTrace: 1,
      logProgress: true,
      logVerbose: false,
    },
  );
  console.log(result);
}

async function main() {
  await updateRunbook();
}

main().catch(console.error);
