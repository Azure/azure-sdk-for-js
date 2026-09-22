// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DynatraceObservability } from "@azure/arm-dynatrace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to informs if the current subscription is being already monitored for selected Dynatrace environment.
 *
 * @summary informs if the current subscription is being already monitored for selected Dynatrace environment.
 * x-ms-original-file: 2024-04-24/CreationSupported_Get.json
 */
async function creationSupportedGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DynatraceObservability(credential, subscriptionId);
  const result = await client.creationSupported.get("00000000-0000-0000-0000");
  console.log(result);
}

async function main(): Promise<void> {
  await creationSupportedGet();
}

main().catch(console.error);
