// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to a long-running resource action.
 *
 * @summary a long-running resource action.
 * x-ms-original-file: 2025-05-01-preview/Monitors_Resubscribe.json
 */
async function monitorsResubscribe() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.resubscribe("myResourceGroup", "myMonitor");
  console.log(result);
}

async function main() {
  await monitorsResubscribe();
}

main().catch(console.error);
