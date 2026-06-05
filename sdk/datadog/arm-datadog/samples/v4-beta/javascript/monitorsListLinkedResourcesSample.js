// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftDatadogClient } = require("@azure/arm-datadog");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all Azure resources associated to the same Datadog organization as the target resource.
 *
 * @summary list all Azure resources associated to the same Datadog organization as the target resource.
 * x-ms-original-file: 2025-12-26-preview/LinkedResources_List.json
 */
async function monitorsListLinkedResources() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listLinkedResources("myResourceGroup", "myMonitor")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await monitorsListLinkedResources();
}

main().catch(console.error);
