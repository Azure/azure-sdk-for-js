// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftDatadogClient } = require("@azure/arm-datadog");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the default application key.
 *
 * @summary get the default application key.
 * x-ms-original-file: 2025-12-26-preview/ApplicationKeys_GetDefaultKey.json
 */
async function monitorsGetDefaultApplicationKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const result = await client.monitors.getDefaultApplicationKey("myResourceGroup", "myMonitor");
  console.log(result);
}

async function main() {
  await monitorsGetDefaultApplicationKey();
}

main().catch(console.error);
