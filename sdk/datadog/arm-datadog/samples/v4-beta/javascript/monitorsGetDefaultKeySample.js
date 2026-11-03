// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftDatadogClient } = require("@azure/arm-datadog");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the default api key.
 *
 * @summary get the default api key.
 * x-ms-original-file: 2025-12-26-preview/ApiKeys_GetDefaultKey.json
 */
async function monitorsGetDefaultKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const result = await client.monitors.getDefaultKey("myResourceGroup", "myMonitor");
  console.log(result);
}

async function main() {
  await monitorsGetDefaultKey();
}

main().catch(console.error);
