// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftDatadogClient } from "@azure/arm-datadog";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the datadog single sign-on resource for the given Monitor.
 *
 * @summary gets the datadog single sign-on resource for the given Monitor.
 * x-ms-original-file: 2025-12-26-preview/SingleSignOnConfigurations_Get.json
 */
async function singleSignOnConfigurationsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const result = await client.singleSignOnConfigurations.get(
    "myResourceGroup",
    "myMonitor",
    "default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await singleSignOnConfigurationsGet();
}

main().catch(console.error);
