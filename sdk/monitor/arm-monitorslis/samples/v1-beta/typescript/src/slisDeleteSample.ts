// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitorslis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an SLI resource.
 *
 * @summary deletes an SLI resource.
 * x-ms-original-file: 2025-03-01-preview/Slis_Delete.json
 */
async function deleteSli(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  await client.slis.delete("testSG", "testSli");
}

async function main(): Promise<void> {
  await deleteSli();
}

main().catch(console.error);
