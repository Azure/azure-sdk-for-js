// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MessagingConnectorsClient } from "@azure/arm-placeholder";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create an Connector instance for the specified subscription, resource group, and instance name.
 *
 * @summary create an Connector instance for the specified subscription, resource group, and instance name.
 * x-ms-original-file: 2025-08-01-preview/AzureDataExplorerSourceConnector_CreateOrUpdate.json
 */
async function azureDataExplorerSourceConnectorCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new MessagingConnectorsClient(credential, subscriptionId);
  const result = await client.connectorOperations.createOrUpdate(
    "abcd",
    "AzureDataExplorerSourceConnector1",
    {
      location: "East US",
      tags: { tag1: "value1", tag2: "value2" },
      properties: {
        direction: "Source",
        converterConfig: { type: "JsonConverter" },
        eventHubConfig: {
          namespaceHostName: "ns",
          eventHubName: "eh",
          authentication: {
            authenticationMode: "ConnectionString",
            connectionString: "connection1",
          },
        },
        maxTasks: 1,
        dataSourceProperties: {
          connectorType: "AzureDataExplorerSource",
          clusterUrl: "hostName.AzureDataExplorer.com",
          database: "databaseName1",
          tableNames: "tableName1,tableName2",
          authentication: {
            authenticationMode: "OAuth",
            accessToken: "accessToken1",
          },
        },
        scalingProperties: { scalingType: "StaticScaling", parallelism: 1 },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await azureDataExplorerSourceConnectorCreateOrUpdate();
}

main().catch(console.error);
