// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftDatadogClient } from "@azure/arm-datadog";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to refresh the set password link and return a latest one.
 *
 * @summary refresh the set password link and return a latest one.
 * x-ms-original-file: 2025-12-26-preview/RefreshSetPassword_Get.json
 */
async function monitorsRefreshSetPasswordLink(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const result = await client.monitors.refreshSetPasswordLink("myResourceGroup", "myMonitor");
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsRefreshSetPasswordLink();
}

main().catch(console.error);
