// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MessagingConnectorsClient } from "@azure/arm-placeholder";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create one dataPreview task
 *
 * @summary create one dataPreview task
 * x-ms-original-file: 2025-08-01-preview/DataPreview_SqlServerSourceConnector.json
 */
async function dataPreviewSqlServerSourceConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new MessagingConnectorsClient(credential, subscriptionId);
  const result = await client.dataPreviewOperations.preview("Central US EUAP", {
    dataPreviewProperties: {
      dataSourceProperties: {
        connectorType: "SqlServerSource",
        hostName: "hostName.SqlServerSource1.com",
        port: 8080,
        databaseName: "databaseName1",
        username: "username1",
        tableNames: "tableNames1",
        password: "",
      },
      dataRange: { limit: 100, type: "Limit" },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await dataPreviewSqlServerSourceConnector();
}

main().catch(console.error);
