// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgresClient } = require("@azure/arm-neonpostgres");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a NeonDatabase
 *
 * @summary create a NeonDatabase
 * x-ms-original-file: 2025-03-01/NeonDatabases_CreateOrUpdate_MaximumSet_Gen.json
 */
async function neonDatabasesCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B8E3300-C5FA-442B-A259-3F6F614D5BD4";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.neonDatabases.createOrUpdate(
    "rgneon",
    "test-org",
    "entity-name",
    "entity-name",
    "entity-name",
    {
      properties: {
        entityName: "entity-name",
        attributes: [{ name: "trhvzyvaqy", value: "evpkgsskyavybxwwssm" }],
        branchId: "orfdwdmzvfvlnrgussvcvoek",
        ownerName: "odmbeg",
      },
    },
  );
  console.log(result);
}

async function main() {
  await neonDatabasesCreateOrUpdateMaximumSet();
}

main().catch(console.error);
