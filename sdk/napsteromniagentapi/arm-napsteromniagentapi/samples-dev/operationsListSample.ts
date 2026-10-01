// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CompanionAPIClient } from "@azure/arm-napsteromniagentapi";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2025-12-24-preview/Operations_List_MaximumSet_Gen.json
 */
async function operationsListMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CompanionAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2025-12-24-preview/Operations_List_MinimumSet_Gen.json
 */
async function operationsListMinimumSetGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CompanionAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await operationsListMaximumSetGeneratedByMaximumSetRule();
  await operationsListMinimumSetGeneratedByMinimumSetRule();
}

main().catch(console.error);
