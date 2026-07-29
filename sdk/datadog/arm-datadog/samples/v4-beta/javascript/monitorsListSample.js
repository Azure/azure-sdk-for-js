// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftDatadogClient } = require("@azure/arm-datadog");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all monitors under the specified subscription.
 *
 * @summary list all monitors under the specified subscription.
 * x-ms-original-file: 2025-12-26-preview/Monitors_List.json
 */
async function monitorsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await monitorsList();
}

main().catch(console.error);
