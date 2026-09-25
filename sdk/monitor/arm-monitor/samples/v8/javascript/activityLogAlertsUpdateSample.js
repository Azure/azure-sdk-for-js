// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates 'tags' and 'enabled' fields in an existing Alert rule. This method is used to update the Alert rule tags, and to enable or disable the Alert rule. To update other fields use CreateOrUpdate operation.
 *
 * @summary updates 'tags' and 'enabled' fields in an existing Alert rule. This method is used to update the Alert rule tags, and to enable or disable the Alert rule. To update other fields use CreateOrUpdate operation.
 * x-ms-original-file: 2023-01-01-preview/ActivityLogAlertRule_Update.json
 */
async function patchAnActivityLogAlertRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "187f412d-1758-44d9-b052-169e2564721d";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.activityLogAlerts.update(
    "MyResourceGroup",
    "SampleActivityLogAlertRule",
    { enabled: false, tags: { key1: "value1", key2: "value2" } },
  );
  console.log(result);
}

async function main() {
  await patchAnActivityLogAlertRule();
}

main().catch(console.error);
