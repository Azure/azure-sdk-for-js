// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a linked service.
 *
 * @summary gets a linked service.
 * x-ms-original-file: 2018-06-01/LinkedServices_Get.json
 */
async function linkedServicesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.linkedServices.get(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleLinkedService",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await linkedServicesGet();
}

main().catch(console.error);
