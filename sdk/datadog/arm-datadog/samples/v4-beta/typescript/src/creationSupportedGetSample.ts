// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftDatadogClient } from "@azure/arm-datadog";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to informs if the current subscription is being already monitored for selected Datadog organization.
 *
 * @summary informs if the current subscription is being already monitored for selected Datadog organization.
 * x-ms-original-file: 2025-12-26-preview/CreationSupported_Get.json
 */
async function creationSupportedGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const result = await client.creationSupported.get("00000000-0000-0000-0000");
  console.log(result);
}

async function main(): Promise<void> {
  await creationSupportedGet();
}

main().catch(console.error);
