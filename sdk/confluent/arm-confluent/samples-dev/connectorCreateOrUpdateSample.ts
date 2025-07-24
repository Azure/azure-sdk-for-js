// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create confluent connector by Name
 *
 * @summary create confluent connector by Name
 * x-ms-original-file: 2024-07-01/Organization_CreateConnectorByName.json
 */
async function connectorCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.connector.createOrUpdate(
    "myResourceGroup",
    "myOrganization",
    "env-12132",
    "dlz-f3a90de",
    "connector-1",
    {
      body: {
        properties: {
          connectorBasicInfo: {
            connectorClass: "AZUREBLOBSTORAGESINK",
            connectorName: "connector-1",
            connectorType: "SINK",
          },
          connectorServiceTypeInfo: {
            connectorServiceType: "AzureBlobStorageSinkConnector",
            storageAccountKey: "*******",
            storageAccountName: "stcfaccount-1",
            storageContainerName: "continer-1",
          },
          partnerConnectorInfo: {
            apiKey: "xxxxxxx",
            apiSecret: "*******",
            authType: "KAFKA_API_KEY",
            flushSize: "1000",
            inputFormat: "JSON",
            maxTasks: "2",
            outputFormat: "JSON",
            partnerConnectorType: "KafkaAzureBlobStorageSink",
            timeInterval: "DAILY",
            topics: ["topic-1"],
            topicsDir: "topicsDir",
          },
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await connectorCreateOrUpdate();
}

main().catch(console.error);
