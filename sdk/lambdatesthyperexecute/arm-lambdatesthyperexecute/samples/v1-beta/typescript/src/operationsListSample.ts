// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HyperExecuteClient } from "@azure/arm-lambdatesthyperexecute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2024-02-01/Operations_List_MaximumSet_Gen.json
 */
async function operationsListMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new HyperExecuteClient(credential, subscriptionId);
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
 * x-ms-original-file: 2024-02-01/Operations_List_MinimumSet_Gen.json
 */
async function operationsListMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new HyperExecuteClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await operationsListMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
  await operationsListMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMinimumSetRule();
}

main().catch(console.error);
