// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get an action group.
 *
 * @summary get an action group.
 * x-ms-original-file: 2024-10-01-preview/getActionGroup.json
 */
async function getAnActionGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "187f412d-1758-44d9-b052-169e2564721d";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.actionGroups.get("Default-NotificationRules", "SampleActionGroup");
  console.log(result);
}

async function main() {
  await getAnActionGroup();
}

main().catch(console.error);
