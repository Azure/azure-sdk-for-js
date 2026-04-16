// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  RegenAuthKeys,
  DataMigrationManagementClient,
} from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Regenerate a new set of Authentication Keys for Self Hosted Integration Runtime.
 *
 * @summary Regenerate a new set of Authentication Keys for Self Hosted Integration Runtime.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/RegenAuthKeysSqlMigrationService.json
 */
async function regenerateTheOfAuthenticationKeys(): Promise<void> {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["DATAMIGRATION_RESOURCE_GROUP"] || "testrg";
  const sqlMigrationServiceName = "service1";
  const parameters: RegenAuthKeys = { keyName: "authKey1" };
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.sqlMigrationServices.regenerateAuthKeys(
    resourceGroupName,
    sqlMigrationServiceName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await regenerateTheOfAuthenticationKeys();
}

main().catch(console.error);
