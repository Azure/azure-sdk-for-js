// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftDatadogClient } from "@azure/arm-datadog";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to set the default api key.
 *
 * @summary set the default api key.
 * x-ms-original-file: 2025-12-26-preview/ApiKeys_SetDefaultKey.json
 */
async function monitorsSetDefaultKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  await client.monitors.setDefaultKey("myResourceGroup", "myMonitor");
}

async function main(): Promise<void> {
  await monitorsSetDefaultKey();
}

main().catch(console.error);
