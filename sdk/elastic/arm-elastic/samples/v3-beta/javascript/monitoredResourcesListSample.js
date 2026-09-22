// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all resources currently being monitored by the Elastic monitor resource, helping you manage observability.
 *
 * @summary list all resources currently being monitored by the Elastic monitor resource, helping you manage observability.
 * x-ms-original-file: 2025-06-01/MonitoredResources_List.json
 */
async function monitoredResourcesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitoredResources.list("myResourceGroup", "myMonitor")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await monitoredResourcesList();
}

main().catch(console.error);
