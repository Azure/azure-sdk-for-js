// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a dataset.
 *
 * @summary gets a dataset.
 * x-ms-original-file: 2018-06-01/Datasets_Get.json
 */
async function datasetsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.datasets.get(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleDataset",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await datasetsGet();
}

main().catch(console.error);
