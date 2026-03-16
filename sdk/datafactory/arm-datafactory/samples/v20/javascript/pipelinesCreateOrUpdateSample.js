// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a pipeline.
 *
 * @summary creates or updates a pipeline.
 * x-ms-original-file: 2018-06-01/Pipelines_Create.json
 */
async function pipelinesCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.pipelines.createOrUpdate(
    "exampleResourceGroup",
    "exampleFactoryName",
    "examplePipeline",
    {
      activities: [
        {
          name: "ExampleForeachActivity",
          type: "ForEach",
          activities: [
            {
              name: "ExampleCopyActivity",
              type: "Copy",
              inputs: [
                {
                  type: "DatasetReference",
                  parameters: {
                    MyFileName: "examplecontainer.csv",
                    MyFolderPath: "examplecontainer",
                  },
                  referenceName: "exampleDataset",
                },
              ],
              outputs: [
                {
                  type: "DatasetReference",
                  parameters: {
                    MyFileName: { type: "Expression", value: "@item()" },
                    MyFolderPath: "examplecontainer",
                  },
                  referenceName: "exampleDataset",
                },
              ],
              dataIntegrationUnits: 32,
              sink: { type: "BlobSink" },
              source: { type: "BlobSource" },
            },
          ],
          isSequential: true,
          items: { type: "Expression", value: "@pipeline().parameters.OutputBlobNameList" },
        },
      ],
      parameters: { JobId: { type: "String" }, OutputBlobNameList: { type: "Array" } },
      policy: { elapsedTimeMetric: { duration: "0.00:10:00" } },
      runDimensions: { JobId: { type: "Expression", value: "@pipeline().parameters.JobId" } },
      variables: { TestVariableArray: { type: "Array" } },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a pipeline.
 *
 * @summary creates or updates a pipeline.
 * x-ms-original-file: 2018-06-01/Pipelines_Update.json
 */
async function pipelinesUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.pipelines.createOrUpdate(
    "exampleResourceGroup",
    "exampleFactoryName",
    "examplePipeline",
    {
      description: "Example description",
      activities: [
        {
          name: "ExampleForeachActivity",
          type: "ForEach",
          activities: [
            {
              name: "ExampleCopyActivity",
              type: "Copy",
              inputs: [
                {
                  type: "DatasetReference",
                  parameters: {
                    MyFileName: "examplecontainer.csv",
                    MyFolderPath: "examplecontainer",
                  },
                  referenceName: "exampleDataset",
                },
              ],
              outputs: [
                {
                  type: "DatasetReference",
                  parameters: {
                    MyFileName: { type: "Expression", value: "@item()" },
                    MyFolderPath: "examplecontainer",
                  },
                  referenceName: "exampleDataset",
                },
              ],
              dataIntegrationUnits: 32,
              sink: { type: "BlobSink" },
              source: { type: "BlobSource" },
            },
          ],
          isSequential: true,
          items: { type: "Expression", value: "@pipeline().parameters.OutputBlobNameList" },
        },
      ],
      parameters: { OutputBlobNameList: { type: "Array" } },
      policy: { elapsedTimeMetric: { duration: "0.00:10:00" } },
    },
  );
  console.log(result);
}

async function main() {
  await pipelinesCreate();
  await pipelinesUpdate();
}

main().catch(console.error);
