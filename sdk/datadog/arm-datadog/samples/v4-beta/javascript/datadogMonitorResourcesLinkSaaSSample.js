// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftDatadogClient } = require("@azure/arm-datadog");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to links a new SaaS to the Datadog organization of the underlying monitor.
 *
 * @summary links a new SaaS to the Datadog organization of the underlying monitor.
 * x-ms-original-file: 2025-12-26-preview/Monitors_LinkSaaS.json
 */
async function monitorsLinkSaaS() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a2b3c4d-5e6f-7a8b-9c0d-e1f2a3b4c5d6";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const result = await client.datadogMonitorResources.linkSaaS("myResourceGroup", "myMonitor", {
    saaSResourceId:
      "/subscriptions/1a2b3c4d-5e6f-7a8b-9c0d-e1f2a3b4c5d6/resourceGroups/myResourceGroup/providers/Microsoft.SaaS/resources/mySaaSResource",
  });
  console.log(result);
}

async function main() {
  await monitorsLinkSaaS();
}

main().catch(console.error);
