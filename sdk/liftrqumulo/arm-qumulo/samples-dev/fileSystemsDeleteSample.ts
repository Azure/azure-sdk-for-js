// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a FileSystemResource
 *
 * @summary Delete a FileSystemResource
 * x-ms-original-file: specification/liftrqumulo/resource-manager/Qumulo.Storage/stable/2024-06-19/examples/FileSystems_Delete_MaximumSet_Gen.json
 */

import { QumuloStorage } from "@azure/arm-qumulo";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function fileSystemsDelete(): Promise<void> {
  const subscriptionId =
    process.env["LIFTRQUMULO_SUBSCRIPTION_ID"] || "382E8C7A-AC80-4D70-8580-EFE99537B9B7";
  const resourceGroupName = process.env["LIFTRQUMULO_RESOURCE_GROUP"] || "rgQumulo";
  const fileSystemName = "xoschzkccroahrykedlvbbnsddq";
  const credential = new DefaultAzureCredential();
  const client = new QumuloStorage(credential, subscriptionId);
  const result = await client.fileSystems.beginDeleteAndWait(resourceGroupName, fileSystemName);
  console.log(result);
}

/**
 * This sample demonstrates how to Delete a FileSystemResource
 *
 * @summary Delete a FileSystemResource
 * x-ms-original-file: specification/liftrqumulo/resource-manager/Qumulo.Storage/stable/2024-06-19/examples/FileSystems_Delete_MinimumSet_Gen.json
 */
async function fileSystemsDeleteMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["LIFTRQUMULO_SUBSCRIPTION_ID"] || "382E8C7A-AC80-4D70-8580-EFE99537B9B7";
  const resourceGroupName = process.env["LIFTRQUMULO_RESOURCE_GROUP"] || "rgQumulo";
  const fileSystemName = "jgtskkiplquyrlkaxvhdg";
  const credential = new DefaultAzureCredential();
  const client = new QumuloStorage(credential, subscriptionId);
  const result = await client.fileSystems.beginDeleteAndWait(resourceGroupName, fileSystemName);
  console.log(result);
}

async function main(): Promise<void> {
  await fileSystemsDelete();
  await fileSystemsDeleteMinimumSetGen();
}

main().catch(console.error);
