// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the diagnostic settings category for the specified resource.
 *
 * @summary gets the diagnostic settings category for the specified resource.
 * x-ms-original-file: 2021-05-01-preview/getDiagnosticSettingsCategory.json
 */
async function getsTheDiagnosticSetting(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const result = await client.diagnosticSettingsCategory.get(
    "subscriptions/1a66ce04-b633-4a0b-b2bc-a912ec8986a6/resourcegroups/viruela1/providers/microsoft.logic/workflows/viruela6",
    "WorkflowRuntime",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheDiagnosticSetting();
}

main().catch(console.error);
