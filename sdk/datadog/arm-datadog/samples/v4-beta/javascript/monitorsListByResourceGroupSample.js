// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftDatadogClient } = require("@azure/arm-datadog");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all monitors under the specified resource group.
 *
 * @summary list all monitors under the specified resource group.
 * x-ms-original-file: 2025-12-26-preview/Monitors_ListByResourceGroup.json
 */
async function monitorsListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listByResourceGroup("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await monitorsListByResourceGroup();
}

main().catch(console.error);
