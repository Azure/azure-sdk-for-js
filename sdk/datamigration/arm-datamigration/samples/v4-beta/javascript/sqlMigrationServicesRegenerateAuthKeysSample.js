// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to regenerate a new set of Authentication Keys for Self Hosted Integration Runtime.
 *
 * @summary regenerate a new set of Authentication Keys for Self Hosted Integration Runtime.
 * x-ms-original-file: 2025-09-01-preview/RegenAuthKeysSqlMigrationService.json
 */
async function regenerateTheOfAuthenticationKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.sqlMigrationServices.regenerateAuthKeys("testrg", "service1", {
    keyName: "authKey1",
  });
  console.log(result);
}

async function main() {
  await regenerateTheOfAuthenticationKeys();
}

main().catch(console.error);
