// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsClient } from "@azure/arm-iotoperations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a DataflowResource
 *
 * @summary create a DataflowResource
 * x-ms-original-file: 2024-11-01/Dataflow_CreateOrUpdate_ComplexContextualization.json
 */
async function dataflowCreateOrUpdateComplexContextualization() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.dataflow.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
    "aio-to-adx-contexualized",
    {
      properties: {
        mode: "Enabled",
        operations: [
          {
            operationType: "Source",
            name: "source1",
            sourceSettings: {
              endpointRef: "aio-builtin-broker-endpoint",
              dataSources: ["azure-iot-operations/data/thermostat"],
            },
          },
          {
            operationType: "BuiltInTransformation",
            name: "transformation1",
            builtInTransformationSettings: {
              map: [
                { inputs: ["*"], output: "*" },
                { inputs: ["$context(quality).*"], output: "enriched.*" },
              ],
              datasets: [
                {
                  key: "quality",
                  inputs: ["$source.country", "$context.country"],
                  expression: "$1 == $2",
                },
              ],
            },
          },
          {
            operationType: "Destination",
            name: "destination1",
            destinationSettings: {
              endpointRef: "adx-endpoint",
              dataDestination: "mytable",
            },
          },
        ],
      },
      extendedLocation: {
        name: "qmbrfwcpwwhggszhrdjv",
        type: "CustomLocation",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a DataflowResource
 *
 * @summary create a DataflowResource
 * x-ms-original-file: 2024-11-01/Dataflow_CreateOrUpdate_ComplexEventHub.json
 */
async function dataflowCreateOrUpdateComplexEventHub() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.dataflow.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
    "aio-to-event-hub-transformed",
    {
      properties: {
        mode: "Enabled",
        operations: [
          {
            operationType: "Source",
            name: "source1",
            sourceSettings: {
              endpointRef: "aio-builtin-broker-endpoint",
              dataSources: ["azure-iot-operations/data/thermostat"],
            },
          },
          {
            operationType: "BuiltInTransformation",
            builtInTransformationSettings: {
              filter: [
                {
                  inputs: ["temperature.Value", '"Tag 10".Value'],
                  expression: "$1 > 9000 && $2 >= 8000",
                },
              ],
              map: [
                { inputs: ["*"], output: "*" },
                {
                  inputs: ["temperature.Value", '"Tag 10".Value'],
                  expression: "($1+$2)/2",
                  output: "AvgTemp.Value",
                },
                {
                  inputs: [],
                  expression: "true",
                  output: "dataflow-processed",
                },
                {
                  inputs: ["temperature.SourceTimestamp"],
                  expression: "",
                  output: "",
                },
                { inputs: ['"Tag 10"'], expression: "", output: "pressure" },
                {
                  inputs: ["temperature.Value"],
                  expression: "cToF($1)",
                  output: "temperatureF.Value",
                },
                {
                  inputs: ['"Tag 10".Value'],
                  expression: "scale ($1,0,10,0,100)",
                  output: '"Scale Tag 10".Value',
                },
              ],
            },
          },
          {
            operationType: "Destination",
            name: "destination1",
            destinationSettings: {
              endpointRef: "event-hub-endpoint",
              dataDestination: "myuniqueeventhub",
            },
          },
        ],
      },
      extendedLocation: {
        name: "qmbrfwcpwwhggszhrdjv",
        type: "CustomLocation",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a DataflowResource
 *
 * @summary create a DataflowResource
 * x-ms-original-file: 2024-11-01/Dataflow_CreateOrUpdate_FilterToTopic.json
 */
async function dataflowCreateOrUpdateFilterToTopic() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.dataflow.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
    "mqtt-filter-to-topic",
    {
      properties: {
        mode: "Enabled",
        operations: [
          {
            operationType: "Source",
            name: "source1",
            sourceSettings: {
              endpointRef: "aio-builtin-broker-endpoint",
              dataSources: ["azure-iot-operations/data/thermostat"],
            },
          },
          {
            operationType: "BuiltInTransformation",
            name: "transformation1",
            builtInTransformationSettings: {
              filter: [
                {
                  type: "Filter",
                  description: "filter-datapoint",
                  inputs: ["temperature.Value", '"Tag 10".Value'],
                  expression: "$1 > 9000 && $2 >= 8000",
                },
              ],
              map: [{ type: "PassThrough", inputs: ["*"], output: "*" }],
            },
          },
          {
            operationType: "Destination",
            name: "destination1",
            destinationSettings: {
              endpointRef: "aio-builtin-broker-endpoint",
              dataDestination: "data/filtered/thermostat",
            },
          },
        ],
      },
      extendedLocation: {
        name: "qmbrfwcpwwhggszhrdjv",
        type: "CustomLocation",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a DataflowResource
 *
 * @summary create a DataflowResource
 * x-ms-original-file: 2024-11-01/Dataflow_CreateOrUpdate_MaximumSet_Gen.json
 */
async function dataflowCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.dataflow.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
    "resource-name123",
    {
      properties: {
        mode: "Enabled",
        operations: [
          {
            operationType: "Source",
            name: "knnafvkwoeakm",
            sourceSettings: {
              endpointRef: "iixotodhvhkkfcfyrkoveslqig",
              assetRef: "zayyykwmckaocywdkohmu",
              serializationFormat: "Json",
              schemaRef: "pknmdzqll",
              dataSources: ["chkkpymxhp"],
            },
            builtInTransformationSettings: {
              serializationFormat: "Delta",
              schemaRef: "mcdc",
              datasets: [
                {
                  key: "qsfqcgxaxnhfumrsdsokwyv",
                  description:
                    "Lorem ipsum odor amet, consectetuer adipiscing elit.",
                  schemaRef: "n",
                  inputs: ["mosffpsslifkq"],
                  expression: "aatbwomvflemsxialv",
                },
              ],
              filter: [
                {
                  type: "Filter",
                  description:
                    "Lorem ipsum odor amet, consectetuer adipiscing elit.",
                  inputs: ["sxmjkbntgb"],
                  expression: "n",
                },
              ],
              map: [
                {
                  type: "NewProperties",
                  description:
                    "Lorem ipsum odor amet, consectetuer adipiscing elit.",
                  inputs: ["xsbxuk"],
                  expression: "txoiltogsarwkzalsphvlmt",
                  output: "nvgtmkfl",
                },
              ],
            },
            destinationSettings: {
              endpointRef: "kybkchnzimerguekuvqlqiqdvvrt",
              dataDestination: "cbrh",
            },
          },
        ],
      },
      extendedLocation: {
        name: "qmbrfwcpwwhggszhrdjv",
        type: "CustomLocation",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a DataflowResource
 *
 * @summary create a DataflowResource
 * x-ms-original-file: 2024-11-01/Dataflow_CreateOrUpdate_SimpleEventGrid.json
 */
async function dataflowCreateOrUpdateSimpleEventGrid() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.dataflow.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
    "aio-to-event-grid",
    {
      properties: {
        mode: "Enabled",
        operations: [
          {
            operationType: "Source",
            name: "source1",
            sourceSettings: {
              endpointRef: "aio-builtin-broker-endpoint",
              dataSources: ["thermostats/+/telemetry/temperature/#"],
            },
          },
          {
            operationType: "Destination",
            name: "destination1",
            destinationSettings: {
              endpointRef: "event-grid-endpoint",
              dataDestination: "factory/telemetry",
            },
          },
        ],
      },
      extendedLocation: {
        name: "qmbrfwcpwwhggszhrdjv",
        type: "CustomLocation",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a DataflowResource
 *
 * @summary create a DataflowResource
 * x-ms-original-file: 2024-11-01/Dataflow_CreateOrUpdate_SimpleFabric.json
 */
async function dataflowCreateOrUpdateSimpleFabric() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.dataflow.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
    "aio-to-fabric",
    {
      properties: {
        mode: "Enabled",
        operations: [
          {
            operationType: "Source",
            name: "source1",
            sourceSettings: {
              endpointRef: "aio-builtin-broker-endpoint",
              dataSources: ["azure-iot-operations/data/thermostat"],
            },
          },
          {
            operationType: "BuiltInTransformation",
            builtInTransformationSettings: {
              serializationFormat: "Parquet",
              schemaRef: "aio-sr://exampleNamespace/exmapleParquetSchema:1.0.0",
            },
          },
          {
            operationType: "Destination",
            name: "destination1",
            destinationSettings: {
              endpointRef: "fabric-endpoint",
              dataDestination: "telemetryTable",
            },
          },
        ],
      },
      extendedLocation: {
        name: "qmbrfwcpwwhggszhrdjv",
        type: "CustomLocation",
      },
    },
  );
  console.log(result);
}

async function main() {
  dataflowCreateOrUpdateComplexContextualization();
  dataflowCreateOrUpdateComplexEventHub();
  dataflowCreateOrUpdateFilterToTopic();
  dataflowCreateOrUpdate();
  dataflowCreateOrUpdateSimpleEventGrid();
  dataflowCreateOrUpdateSimpleFabric();
}

main().catch(console.error);
