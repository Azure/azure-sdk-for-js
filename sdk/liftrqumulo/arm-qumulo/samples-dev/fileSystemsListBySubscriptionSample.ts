// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List FileSystemResource resources by subscription ID
 *
 * @summary List FileSystemResource resources by subscription ID
 * x-ms-original-file: specification/liftrqumulo/resource-manager/Qumulo.Storage/stable/2024-06-19/examples/FileSystems_ListBySubscription_MaximumSet_Gen.json
 */

import { QumuloStorage } from "@azure/arm-qumulo";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function fileSystemsListBySubscription(): Promise<void> {
  const subscriptionId =
    process.env["LIFTRQUMULO_SUBSCRIPTION_ID"] || "382E8C7A-AC80-4D70-8580-EFE99537B9B7";
  const credential = new DefaultAzureCredential();
  const client = new QumuloStorage(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fileSystems.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to List FileSystemResource resources by subscription ID
 *
 * @summary List FileSystemResource resources by subscription ID
 * x-ms-original-file: specification/liftrqumulo/resource-manager/Qumulo.Storage/stable/2024-06-19/examples/FileSystems_ListBySubscription_MinimumSet_Gen.json
 */
async function fileSystemsListBySubscriptionMinimumSetGen(): Promise<void> {
  const subscriptionId = process.env["LIFTRQUMULO_SUBSCRIPTION_ID"] || "aaaaaaa";
  const credential = new DefaultAzureCredential();
  const client = new QumuloStorage(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fileSystems.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await fileSystemsListBySubscription();
  await fileSystemsListBySubscriptionMinimumSetGen();
}

main().catch(console.error);
