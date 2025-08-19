// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { QumuloStorage } from "@azure/arm-qumulo";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List FileSystemResource resources by resource group
 *
 * @summary List FileSystemResource resources by resource group
 * x-ms-original-file: specification/liftrqumulo/resource-manager/Qumulo.Storage/stable/2024-06-19/examples/FileSystems_ListByResourceGroup_MaximumSet_Gen.json
 */
async function fileSystemsListByResourceGroup(): Promise<void> {
  const subscriptionId =
    process.env["LIFTRQUMULO_SUBSCRIPTION_ID"] || "382E8C7A-AC80-4D70-8580-EFE99537B9B7";
  const resourceGroupName = process.env["LIFTRQUMULO_RESOURCE_GROUP"] || "rgQumulo";
  const credential = new DefaultAzureCredential();
  const client = new QumuloStorage(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fileSystems.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to List FileSystemResource resources by resource group
 *
 * @summary List FileSystemResource resources by resource group
 * x-ms-original-file: specification/liftrqumulo/resource-manager/Qumulo.Storage/stable/2024-06-19/examples/FileSystems_ListByResourceGroup_MinimumSet_Gen.json
 */
async function fileSystemsListByResourceGroupMinimumSetGen(): Promise<void> {
  const subscriptionId = process.env["LIFTRQUMULO_SUBSCRIPTION_ID"] || "aaaaaaa";
  const resourceGroupName = process.env["LIFTRQUMULO_RESOURCE_GROUP"] || "rgQumulo";
  const credential = new DefaultAzureCredential();
  const client = new QumuloStorage(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fileSystems.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await fileSystemsListByResourceGroup();
  await fileSystemsListByResourceGroupMinimumSetGen();
}

main().catch(console.error);
