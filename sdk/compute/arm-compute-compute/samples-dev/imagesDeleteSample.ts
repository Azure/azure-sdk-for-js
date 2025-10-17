// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an Image.
 *
 * @summary deletes an Image.
 * x-ms-original-file: 2025-04-01/imageExamples/Images_Delete_MaximumSet_Gen.json
 */
async function imageDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.images.delete("rgcompute", "aaaaaaaaaaaaaaaaaaaaaaaaaaa");
}

/**
 * This sample demonstrates how to deletes an Image.
 *
 * @summary deletes an Image.
 * x-ms-original-file: 2025-04-01/imageExamples/Images_Delete_MinimumSet_Gen.json
 */
async function imageDeleteMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.images.delete("rgcompute", "aaaaaaaaaaaaaaaaaaaaaaaaaaaa");
}

async function main(): Promise<void> {
  await imageDeleteMaximumSetGen();
  await imageDeleteMinimumSetGen();
}

main().catch(console.error);
