// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a dataset.
 *
 * @summary deletes a dataset.
 * x-ms-original-file: 2018-06-01/Datasets_Delete.json
 */
async function datasetsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.datasets.delete("exampleResourceGroup", "exampleFactoryName", "exampleDataset");
}

async function main() {
  await datasetsDelete();
}

main().catch(console.error);
