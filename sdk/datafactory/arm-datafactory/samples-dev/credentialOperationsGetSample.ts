// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a credential.
 *
 * @summary gets a credential.
 * x-ms-original-file: 2018-06-01/Credentials_Get.json
 */
async function credentialsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.credentialOperations.get(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleCredential",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await credentialsGet();
}

main().catch(console.error);
