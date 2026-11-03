// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { QumuloStorage } from "@azure/arm-qumulo";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list FileSystemResource resources by resource group
 *
 * @summary list FileSystemResource resources by resource group
 * x-ms-original-file: 2026-04-16/FileSystems_ListByResourceGroup_MaximumSet_Gen.json
 */
async function fileSystemsListByResourceGroupMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C9CC2D2A-5AA0-4839-A85F-18491F2D244A";
  const client = new QumuloStorage(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fileSystems.listByResourceGroup("rgQumulo")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list FileSystemResource resources by resource group
 *
 * @summary list FileSystemResource resources by resource group
 * x-ms-original-file: 2026-04-16/FileSystems_ListByResourceGroup_MinimumSet_Gen.json
 */
async function fileSystemsListByResourceGroupMaximumSetGenGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "53BA951C-DA09-400A-AB3A-F8E98F317423";
  const client = new QumuloStorage(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fileSystems.listByResourceGroup("rgQumulo")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await fileSystemsListByResourceGroupMaximumSet();
  await fileSystemsListByResourceGroupMaximumSetGenGeneratedByMinimumSetRule();
}

main().catch(console.error);
