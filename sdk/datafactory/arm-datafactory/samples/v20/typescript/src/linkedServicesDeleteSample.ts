// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a linked service.
 *
 * @summary deletes a linked service.
 * x-ms-original-file: 2018-06-01/LinkedServices_Delete.json
 */
async function linkedServicesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.linkedServices.delete(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleLinkedService",
  );
}

async function main(): Promise<void> {
  await linkedServicesDelete();
}

main().catch(console.error);
