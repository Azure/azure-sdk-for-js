// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists available operations.
 *
 * @summary lists available operations.
 * x-ms-original-file: 2024-10-01/Operations_ListOperations.json
 */
async function listOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.operations.list();
  console.log(result);
}

async function main(): Promise<void> {
  await listOperations();
}

main().catch(console.error);
