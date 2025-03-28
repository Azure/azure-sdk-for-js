// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WeightsAndBiasesClient } from "@azure/arm-weightsandbiases";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2024-09-18-preview/Operations_List_MaximumSet_Gen.json
 */
async function operationsListGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new WeightsAndBiasesClient(credential, subscriptionId);
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
 * x-ms-original-file: 2024-09-18-preview/Operations_List_MinimumSet_Gen.json
 */
async function operationsListGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new WeightsAndBiasesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await operationsListGeneratedByMaximumSetRule();
  await operationsListGeneratedByMinimumSetRule();
}

main().catch(console.error);
