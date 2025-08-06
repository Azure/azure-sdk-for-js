// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MessagingConnectorsClient } from "@azure/arm-placeholder";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create one validation task for connector config
 *
 * @summary create one validation task for connector config
 * x-ms-original-file: 2025-08-01-preview/Configs_ConnectorValidation.json
 */
async function configOperationsConnectorValidation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new MessagingConnectorsClient(credential, subscriptionId);
  const result = await client.configOperations.connectorValidation(
    "Central US EUAP",
    {
      connectorProperties: {
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
  await configOperationsConnectorValidation();
}

main().catch(console.error);
