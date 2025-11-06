// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsClient } from "@azure/arm-iotoperations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a DataflowGraphResource
 *
 * @summary create a DataflowGraphResource
 * x-ms-original-file: 2025-10-01/DataflowGraph_CreateOrUpdate_MaximumSet_Gen.json
 */
async function dataflowGraphCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.dataflowGraph.createOrUpdate(
    "rgiotoperations",
    "resource-123",
    "resource-123",
    "resource-123",
    {
      properties: {
        mode: "Enabled",
        requestDiskPersistence: "Enabled",
        nodes: [
          {
            nodeType: "Source",
            name: "temperature",
            sourceSettings: {
              endpointRef: "default",
              dataSources: ["telemetry/temperature"],
            },
          },
          {
            nodeType: "Graph",
            name: "my-graph",
            graphSettings: {
              registryEndpointRef: "my-registry-endpoint",
              artifact: "my-wasm-module:1.4.3",
              configuration: [
                { key: "key1", value: "value1" },
                { key: "key2", value: "value2" },
              ],
            },
          },
          {
            nodeType: "Destination",
            name: "alert",
            destinationSettings: {
              endpointRef: "default",
              dataDestination: "telemetry/temperature/alert",
            },
          },
          {
            nodeType: "Destination",
            name: "fabric",
            destinationSettings: {
              endpointRef: "fabric",
              dataDestination: "my-table",
            },
          },
        ],
        nodeConnections: [
          {
            from: {
              name: "temperature",
              schema: {
                serializationFormat: "Avro",
                schemaRef: "aio-sr://namespace/temperature:1",
              },
            },
            to: { name: "my-graph" },
          },
          {
            from: {
              name: "my-graph.alert-output",
              schema: {
                serializationFormat: "Avro",
                schemaRef: "aio-sr://namespace/alert:1",
              },
            },
            to: { name: "fabric" },
          },
          {
            from: {
              name: "my-graph.normal-output",
              schema: {
                serializationFormat: "Avro",
                schemaRef: "aio-sr://namespace/alert:1",
              },
            },
            to: { name: "fabric" },
          },
        ],
      },
      extendedLocation: {
        name: "/subscriptions/F8C729F9-DF9C-4743-848F-96EE433D8E53/resourceGroups/rgiotoperations/providers/Microsoft.ExtendedLocation/customLocations/resource-123",
        type: "CustomLocation",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await dataflowGraphCreateOrUpdateMaximumSet();
}

main().catch(console.error);
