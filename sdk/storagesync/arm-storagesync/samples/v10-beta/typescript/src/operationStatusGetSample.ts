// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftStorageSync } from "@azure/arm-storagesync";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Operation status
 *
 * @summary get Operation status
 * x-ms-original-file: 2022-09-01/OperationStatus_Get.json
 */
async function operationStatusGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const result = await client.operationStatus.get(
    "SampleResourceGroup_1",
    "westus",
    "828219ea-083e-48b5-89ea-8fd9991b2e75",
    "14b50e24-f68d-4b29-a882-38be9dfb8bd1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await operationStatusGet();
}

main().catch(console.error);
