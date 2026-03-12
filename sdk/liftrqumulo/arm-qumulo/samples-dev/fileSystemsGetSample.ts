// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a FileSystemResource
 *
 * @summary Get a FileSystemResource
 * x-ms-original-file: specification/liftrqumulo/resource-manager/Qumulo.Storage/stable/2024-06-19/examples/FileSystems_Get_MaximumSet_Gen.json
 */

import { QumuloStorage } from "@azure/arm-qumulo";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function fileSystemsGet(): Promise<void> {
  const subscriptionId =
    process.env["LIFTRQUMULO_SUBSCRIPTION_ID"] || "382E8C7A-AC80-4D70-8580-EFE99537B9B7";
  const resourceGroupName = process.env["LIFTRQUMULO_RESOURCE_GROUP"] || "rgQumulo";
  const fileSystemName = "sihbehcisdqtqqyfiewiiaphgh";
  const credential = new DefaultAzureCredential();
  const client = new QumuloStorage(credential, subscriptionId);
  const result = await client.fileSystems.get(resourceGroupName, fileSystemName);
  console.log(result);
}

/**
 * This sample demonstrates how to Get a FileSystemResource
 *
 * @summary Get a FileSystemResource
 * x-ms-original-file: specification/liftrqumulo/resource-manager/Qumulo.Storage/stable/2024-06-19/examples/FileSystems_Get_MinimumSet_Gen.json
 */
async function fileSystemsGetMinimumSetGen(): Promise<void> {
  const subscriptionId = process.env["LIFTRQUMULO_SUBSCRIPTION_ID"] || "aaaaaaa";
  const resourceGroupName = process.env["LIFTRQUMULO_RESOURCE_GROUP"] || "rgQumulo";
  const fileSystemName = "aaaaaaaaaaaaaaaaa";
  const credential = new DefaultAzureCredential();
  const client = new QumuloStorage(credential, subscriptionId);
  const result = await client.fileSystems.get(resourceGroupName, fileSystemName);
  console.log(result);
}

async function main(): Promise<void> {
  await fileSystemsGet();
  await fileSystemsGetMinimumSetGen();
}

main().catch(console.error);
