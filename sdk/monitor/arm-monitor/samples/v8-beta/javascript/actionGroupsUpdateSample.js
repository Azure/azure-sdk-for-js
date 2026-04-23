// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an existing action group's tags. To update other fields use the CreateOrUpdate method.
 *
 * @summary updates an existing action group's tags. To update other fields use the CreateOrUpdate method.
 * x-ms-original-file: 2024-10-01-preview/patchActionGroup.json
 */
async function patchAnActionGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "187f412d-1758-44d9-b052-169e2564721d";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.actionGroups.update(
    "Default-NotificationRules",
    "SampleActionGroup",
    {
      identity: { type: "SystemAssigned" },
      enabled: false,
      tags: { key1: "value1", key2: "value2" },
    },
  );
  console.log(result);
}

async function main() {
  await patchAnActionGroup();
}

main().catch(console.error);
