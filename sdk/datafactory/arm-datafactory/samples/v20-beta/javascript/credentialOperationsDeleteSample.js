// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a credential.
 *
 * @summary deletes a credential.
 * x-ms-original-file: 2018-06-01/Credentials_Delete.json
 */
async function credentialsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.credentialOperations.delete(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleCredential",
  );
}

async function main() {
  await credentialsDelete();
}

main().catch(console.error);
