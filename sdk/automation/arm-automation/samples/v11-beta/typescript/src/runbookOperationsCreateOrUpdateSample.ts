// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create the runbook identified by runbook name.
 *
 * @summary create the runbook identified by runbook name.
 * x-ms-original-file: 2024-10-23/runbook/createOrUpdateRunbook.json
 */
async function createOrUpdateRunbookAndPublishIt(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.runbookOperations.createOrUpdate(
    "rg",
    "ContoseAutomationAccount",
    "Get-AzureVMTutorial",
    {
      name: "Get-AzureVMTutorial",
      location: "East US 2",
      description: "Description of the Runbook",
      logActivityTrace: 1,
      logProgress: true,
      logVerbose: false,
      publishContentLink: {
        contentHash: {
          algorithm: "SHA256",
          value: "115775B8FF2BE672D8A946BD0B489918C724DDE15A440373CA54461D53010A80",
        },
        uri: "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/101-automation-runbook-getvms/Runbooks/Get-AzureVMTutorial.ps1",
      },
      runbookType: "PowerShell",
      runtimeEnvironment: "environmentName",
      tags: { tag01: "value01", tag02: "value02" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create the runbook identified by runbook name.
 *
 * @summary create the runbook identified by runbook name.
 * x-ms-original-file: 2024-10-23/runbook/createRunbookAsDraft.json
 */
async function createRunbookAsDraft(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.runbookOperations.createOrUpdate(
    "rg",
    "ContoseAutomationAccount",
    "Get-AzureVMTutorial",
    {
      name: "Get-AzureVMTutorial",
      location: "East US 2",
      description: "Description of the Runbook",
      draft: {},
      logProgress: false,
      logVerbose: false,
      runbookType: "PowerShell",
      runtimeEnvironment: "environmentName",
      tags: { tag01: "value01", tag02: "value02" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateRunbookAndPublishIt();
  await createRunbookAsDraft();
}

main().catch(console.error);
