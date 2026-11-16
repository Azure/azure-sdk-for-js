// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about a PostgreSQL role that is a member of azure_pg_admin and mapped to a Microsoft Entra principal.
 *
 * @summary gets information about a PostgreSQL role that is a member of azure_pg_admin and mapped to a Microsoft Entra principal.
 * x-ms-original-file: 2026-10-01-preview/MicrosoftEntraAdministrators_Get.json
 */
async function getAMicrosoftEntraAdministratorForAHorizonDBCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.microsoftEntraAdministrators.get(
    "example-resource-group",
    "example-cluster",
    "11111111-1111-1111-1111-111111111111",
  );
  console.log(result);
}

async function main() {
  await getAMicrosoftEntraAdministratorForAHorizonDBCluster();
}

main().catch(console.error);
