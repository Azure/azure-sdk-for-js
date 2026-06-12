// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an IoT Connector resource with the specified parameters.
 *
 * @summary creates or updates an IoT Connector resource with the specified parameters.
 * x-ms-original-file: 2025-04-01-preview/iotconnectors/iotconnector_Create.json
 */
async function createAnIoTConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.iotConnectors.createOrUpdate("testRG", "workspace1", "blue", {
    identity: { type: "SystemAssigned" },
    location: "westus",
    deviceMapping: {
      content: {
        template: [
          {
            template: {
              deviceIdExpression: "$.deviceid",
              timestampExpression: "$.measurementdatetime",
              typeMatchExpression: "$..[?(@heartrate)]",
              typeName: "heartrate",
              values: [{ required: "true", valueExpression: "$.heartrate", valueName: "hr" }],
            },
            templateType: "JsonPathContent",
          },
        ],
        templateType: "CollectionContent",
      },
    },
    ingestionEndpointConfiguration: {
      consumerGroup: "ConsumerGroupA",
      eventHubName: "MyEventHubName",
      fullyQualifiedEventHubNamespace: "myeventhub.servicesbus.windows.net",
    },
    tags: { additionalProp1: "string", additionalProp2: "string", additionalProp3: "string" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createAnIoTConnector();
}

main().catch(console.error);
