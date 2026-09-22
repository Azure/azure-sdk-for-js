// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to add a data flow into debug session.
 *
 * @summary add a data flow into debug session.
 * x-ms-original-file: 2018-06-01/DataFlowDebugSession_AddDataFlow.json
 */
async function dataFlowDebugSessionAddDataFlow() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.dataFlowDebugSession.addDataFlow(
    "exampleResourceGroup",
    "exampleFactoryName",
    {
      additionalProperties: {
        properties: {
          dataFlow: {
            name: "dataflow1",
            properties: {
              type: "MappingDataFlow",
              typeProperties: {
                script:
                  "\n\nsource(output(\n\t\tColumn_1 as string\n\t),\n\tallowSchemaDrift: true,\n\tvalidateSchema: false) ~> source1",
                sinks: [],
                sources: [
                  {
                    name: "source1",
                    dataset: { type: "DatasetReference", referenceName: "DelimitedText2" },
                  },
                ],
                transformations: [],
              },
            },
          },
          datasets: [
            {
              name: "dataset1",
              properties: {
                type: "DelimitedText",
                schema: [{ type: "String" }],
                annotations: [],
                linkedServiceName: {
                  type: "LinkedServiceReference",
                  referenceName: "linkedService5",
                },
                typeProperties: {
                  columnDelimiter: ",",
                  escapeChar: "\\",
                  firstRowAsHeader: true,
                  location: {
                    type: "AzureBlobStorageLocation",
                    container: "dataflow-sample-data",
                    fileName: "Ansiencoding.csv",
                  },
                  quoteChar: '"',
                },
              },
            },
          ],
          debugSettings: {
            datasetParameters: { Movies: { path: "abc" }, Output: { time: "def" } },
            parameters: { sourcePath: "Toy" },
            sourceSettings: [
              { rowLimit: 1000, sourceName: "source1" },
              { rowLimit: 222, sourceName: "source2" },
            ],
          },
          linkedServices: [
            {
              name: "linkedService1",
              properties: {
                type: "AzureBlobStorage",
                annotations: [],
                typeProperties: {
                  connectionString:
                    "DefaultEndpointsProtocol=https;AccountName=<storageName>;EndpointSuffix=core.windows.net;",
                  encryptedCredential: "<credential>",
                },
              },
            },
          ],
          sessionId: "f06ed247-9d07-49b2-b05e-2cb4a2fc871e",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await dataFlowDebugSessionAddDataFlow();
}

main().catch(console.error);
