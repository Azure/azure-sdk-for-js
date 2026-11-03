// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealth } from "@azure/arm-resourcehealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists available operations for the resourcehealth resource provider
 *
 * @summary lists available operations for the resourcehealth resource provider
 * x-ms-original-file: 2025-05-01/Operations_List.json
 */
async function getOperationsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftResourceHealth(credential);
  const result = await client.operations.list();
  console.log(result);
}

async function main(): Promise<void> {
  await getOperationsList();
}

main().catch(console.error);
