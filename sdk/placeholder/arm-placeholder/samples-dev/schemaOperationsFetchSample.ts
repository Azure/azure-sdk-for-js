// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MessagingConnectorsClient } from "@azure/arm-placeholder";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to fetch Schema task
 *
 * @summary fetch Schema task
 * x-ms-original-file: 2025-08-01-preview/FetchCdcSchema.json
 */
async function schemaOperationsFetchCdcSchema(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new MessagingConnectorsClient(credential, subscriptionId);
  const result = await client.schemaOperations.fetch("Central US EUAP", {
    connectorSchemaConfig: {
      connectorType: "SqlServerSource",
      serverName: "servername1",
      port: 8888,
      databaseName: "databasename1",
      userName: "username1",
      password: "password1",
      tables: "tables1,tables2",
    },
    format: { type: "Avro", version: "1.12.0" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await schemaOperationsFetchCdcSchema();
}

main().catch(console.error);
