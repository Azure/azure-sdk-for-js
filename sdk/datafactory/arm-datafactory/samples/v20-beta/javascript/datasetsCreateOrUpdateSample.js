// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a dataset.
 *
 * @summary creates or updates a dataset.
 * x-ms-original-file: 2018-06-01/Datasets_Create.json
 */
async function datasetsCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.datasets.createOrUpdate(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleDataset",
    {
      properties: {
        type: "AzureBlob",
        linkedServiceName: {
          type: "LinkedServiceReference",
          referenceName: "exampleLinkedService",
        },
        parameters: { MyFileName: { type: "String" }, MyFolderPath: { type: "String" } },
        format: { type: "TextFormat" },
        fileName: { type: "Expression", value: "@dataset().MyFileName" },
        folderPath: { type: "Expression", value: "@dataset().MyFolderPath" },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a dataset.
 *
 * @summary creates or updates a dataset.
 * x-ms-original-file: 2018-06-01/Datasets_Update.json
 */
async function datasetsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.datasets.createOrUpdate(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleDataset",
    {
      properties: {
        type: "AzureBlob",
        description: "Example description",
        linkedServiceName: {
          type: "LinkedServiceReference",
          referenceName: "exampleLinkedService",
        },
        parameters: { MyFileName: { type: "String" }, MyFolderPath: { type: "String" } },
        format: { type: "TextFormat" },
        fileName: { type: "Expression", value: "@dataset().MyFileName" },
        folderPath: { type: "Expression", value: "@dataset().MyFolderPath" },
      },
    },
  );
  console.log(result);
}

async function main() {
  await datasetsCreate();
  await datasetsUpdate();
}

main().catch(console.error);
