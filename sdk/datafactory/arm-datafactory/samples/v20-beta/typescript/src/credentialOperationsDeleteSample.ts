// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a credential.
 *
 * @summary deletes a credential.
 * x-ms-original-file: 2018-06-01/Credentials_Delete.json
 */
async function credentialsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.credentialOperations.delete(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleCredential",
  );
}

async function main(): Promise<void> {
  await credentialsDelete();
}

main().catch(console.error);
