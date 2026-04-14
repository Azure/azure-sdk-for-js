// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a credential.
 *
 * @summary creates or updates a credential.
 * x-ms-original-file: 2018-06-01/Credentials_Create.json
 */
async function credentialsCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.credentialOperations.createOrUpdate(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleCredential",
    {
      properties: {
        type: "ManagedIdentity",
        resourceId:
          "/subscriptions/12345678-1234-1234-1234-123456789012/resourcegroups/exampleResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/exampleUami",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await credentialsCreate();
}

main().catch(console.error);
