// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a linked service.
 *
 * @summary creates or updates a linked service.
 * x-ms-original-file: 2018-06-01/LinkedServices_Create.json
 */
async function linkedServicesCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.linkedServices.createOrUpdate(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleLinkedService",
    {
      properties: {
        type: "AzureStorage",
        connectionString: {
          type: "SecureString",
          value:
            "DefaultEndpointsProtocol=https;AccountName=examplestorageaccount;AccountKey=<storage key>",
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a linked service.
 *
 * @summary creates or updates a linked service.
 * x-ms-original-file: 2018-06-01/LinkedServices_Update.json
 */
async function linkedServicesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.linkedServices.createOrUpdate(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleLinkedService",
    {
      properties: {
        type: "AzureStorage",
        description: "Example description",
        connectionString: {
          type: "SecureString",
          value:
            "DefaultEndpointsProtocol=https;AccountName=examplestorageaccount;AccountKey=<storage key>",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await linkedServicesCreate();
  await linkedServicesUpdate();
}

main().catch(console.error);
