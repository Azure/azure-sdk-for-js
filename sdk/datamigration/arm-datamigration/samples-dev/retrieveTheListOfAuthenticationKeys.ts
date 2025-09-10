// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to Retrieve the List of Authentication Keys for Self Hosted Integration Runtime.
 *
 * @summary Retrieve the List of Authentication Keys for Self Hosted Integration Runtime.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/preview/2021-10-30-preview/examples/ListAuthKeysMigrationService.json
 */
import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

async function retrieveTheListOfAuthenticationKeys(): Promise<void> {
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = "testrg";
  const sqlMigrationServiceName = "service1";
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.sqlMigrationServices.listAuthKeys(
    resourceGroupName,
    sqlMigrationServiceName,
  );
  console.log(result);
}

retrieveTheListOfAuthenticationKeys().catch(console.error);
