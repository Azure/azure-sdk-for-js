// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the active diagnostic settings for the specified resource. **WARNING**: This method will be deprecated in future releases.
 *
 * @summary gets the active diagnostic settings for the specified resource. **WARNING**: This method will be deprecated in future releases.
 * x-ms-original-file: 2016-09-01/getServiceDiagnosticSetting.json
 */
async function getServiceDiagnosticSetting(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const result = await client.serviceDiagnosticSettings.get(
    "subscriptions/1a66ce04-b633-4a0b-b2bc-a912ec8986a6/resourcegroups/viruela1/providers/microsoft.logic/workflows/viruela6",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getServiceDiagnosticSetting();
}

main().catch(console.error);
