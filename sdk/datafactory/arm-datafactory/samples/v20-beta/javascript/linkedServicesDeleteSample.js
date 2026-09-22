// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a linked service.
 *
 * @summary deletes a linked service.
 * x-ms-original-file: 2018-06-01/LinkedServices_Delete.json
 */
async function linkedServicesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.linkedServices.delete(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleLinkedService",
  );
}

async function main() {
  await linkedServicesDelete();
}

main().catch(console.error);
