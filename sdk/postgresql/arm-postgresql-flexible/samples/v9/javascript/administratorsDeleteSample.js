// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes an Microsoft Entra Administrator associated with the server.
 *
 * @summary Deletes an Microsoft Entra Administrator associated with the server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/preview/2025-01-01-preview/examples/AdministratorDelete.json
 */

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function administratorDelete() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "testrg";
  const serverName = "testserver";
  const objectId = "oooooooo-oooo-oooo-oooo-oooooooooooo";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.administrators.beginDeleteAndWait(
    resourceGroupName,
    serverName,
    objectId,
  );
  console.log(result);
}

async function main() {
  await administratorDelete();
}

main().catch(console.error);
