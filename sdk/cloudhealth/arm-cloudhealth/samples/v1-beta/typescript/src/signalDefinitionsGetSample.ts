// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a SignalDefinition
 *
 * @summary get a SignalDefinition
 * x-ms-original-file: 2026-05-01-preview/SignalDefinitions_Get.json
 */
async function signalDefinitionsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.signalDefinitions.get(
    "online-store-rg",
    "online-store",
    "sql-cpu-percent",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await signalDefinitionsGet();
}

main().catch(console.error);
