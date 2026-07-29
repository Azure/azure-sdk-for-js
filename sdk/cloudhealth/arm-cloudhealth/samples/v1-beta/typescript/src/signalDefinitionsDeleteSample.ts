// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a SignalDefinition
 *
 * @summary delete a SignalDefinition
 * x-ms-original-file: 2026-05-01-preview/SignalDefinitions_Delete.json
 */
async function signalDefinitionsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  await client.signalDefinitions.delete("online-store-rg", "online-store", "sql-cpu-percent");
}

async function main(): Promise<void> {
  await signalDefinitionsDelete();
}

main().catch(console.error);
