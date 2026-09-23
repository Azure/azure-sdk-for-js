// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an action group.
 *
 * @summary delete an action group.
 * x-ms-original-file: 2024-10-01-preview/deleteActionGroup.json
 */
async function deleteAnActionGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "187f412d-1758-44d9-b052-169e2564721d";
  const client = new MonitorClient(credential, subscriptionId);
  await client.actionGroups.delete("Default-NotificationRules", "SampleActionGroup");
}

async function main() {
  await deleteAnActionGroup();
}

main().catch(console.error);
