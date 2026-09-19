// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve the linked workspace for the account id.
 *
 * @summary retrieve the linked workspace for the account id.
 * x-ms-original-file: 2024-10-23/getLinkedWorkspace.json
 */
async function getTheLinkedWorkspaceOfAnAutomationAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.linkedWorkspaceOperations.get("rg", "ContosoAutomationAccount");
  console.log(result);
}

async function main() {
  await getTheLinkedWorkspaceOfAnAutomationAccount();
}

main().catch(console.error);
