// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { QumuloStorage } = require("@azure/arm-qumulo");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list FileSystemResource resources by subscription ID
 *
 * @summary list FileSystemResource resources by subscription ID
 * x-ms-original-file: 2026-04-16/FileSystems_ListBySubscription_MaximumSet_Gen.json
 */
async function fileSystemsListBySubscriptionMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C9CC2D2A-5AA0-4839-A85F-18491F2D244A";
  const client = new QumuloStorage(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fileSystems.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list FileSystemResource resources by subscription ID
 *
 * @summary list FileSystemResource resources by subscription ID
 * x-ms-original-file: 2026-04-16/FileSystems_ListBySubscription_MinimumSet_Gen.json
 */
async function fileSystemsListBySubscriptionMaximumSetGenGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "53BA951C-DA09-400A-AB3A-F8E98F317423";
  const client = new QumuloStorage(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fileSystems.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await fileSystemsListBySubscriptionMaximumSet();
  await fileSystemsListBySubscriptionMaximumSetGenGeneratedByMinimumSetRule();
}

main().catch(console.error);
