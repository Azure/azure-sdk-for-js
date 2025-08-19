// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { QumuloStorage } from "@azure/arm-qumulo";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List the operations for the provider
 *
 * @summary List the operations for the provider
 * x-ms-original-file: specification/liftrqumulo/resource-manager/Qumulo.Storage/stable/2024-06-19/examples/Operations_List_MaximumSet_Gen.json
 */
async function operationsList(): Promise<void> {
  const subscriptionId =
    process.env["LIFTRQUMULO_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new QumuloStorage(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to List the operations for the provider
 *
 * @summary List the operations for the provider
 * x-ms-original-file: specification/liftrqumulo/resource-manager/Qumulo.Storage/stable/2024-06-19/examples/Operations_List_MinimumSet_Gen.json
 */
async function operationsListMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["LIFTRQUMULO_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new QumuloStorage(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await operationsList();
  await operationsListMinimumSetGen();
}

main().catch(console.error);
