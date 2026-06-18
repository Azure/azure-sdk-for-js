// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve the List of Authentication Keys for Self Hosted Integration Runtime.
 *
 * @summary retrieve the List of Authentication Keys for Self Hosted Integration Runtime.
 * x-ms-original-file: 2025-09-01-preview/ListAuthKeysSqlMigrationService.json
 */
async function retrieveTheListOfAuthenticationKeys(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.sqlMigrationServices.listAuthKeys("testrg", "service1");
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveTheListOfAuthenticationKeys();
}

main().catch(console.error);
