// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MessagingConnectorsClient } from "@azure/arm-placeholder";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create one validation task for datapreview config
 *
 * @summary create one validation task for datapreview config
 * x-ms-original-file: 2025-08-01-preview/Configs_DatapreviewValidation.json
 */
async function configOperationsDataPreviewValidation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new MessagingConnectorsClient(credential, subscriptionId);
  const result = await client.configOperations.dataPreviewValidation(
    "Central US EUAP",
    {
      dataPreviewProperties: {
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
        dataRange: { limit: 100, type: "Limit" },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await configOperationsDataPreviewValidation();
}

main().catch(console.error);
