// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftDatadogClient } = require("@azure/arm-datadog");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the latest SaaS linked to the Datadog organization of the underlying monitor.
 *
 * @summary returns the latest SaaS linked to the Datadog organization of the underlying monitor.
 * x-ms-original-file: 2025-12-26-preview/Monitors_LatestLinkedSaaS.json
 */
async function monitorsLatestLinkedSaaS() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const result = await client.datadogMonitorResources.latestLinkedSaaS(
    "myResourceGroup",
    "myMonitor",
  );
  console.log(result);
}

async function main() {
  await monitorsLatestLinkedSaaS();
}

main().catch(console.error);
