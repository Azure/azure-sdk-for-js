// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes an existing server administrator associated to a Microsoft Entra principal.
 *
 * @summary Deletes an existing server administrator associated to a Microsoft Entra principal.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/AdministratorsMicrosoftEntraDelete.json
 */
async function deleteAServerAdministratorAssociatedToAMicrosoftEntraPrincipal(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const objectId = "oooooooo-oooo-oooo-oooo-oooooooooooo";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.administratorsMicrosoftEntra.beginDeleteAndWait(
    resourceGroupName,
    serverName,
    objectId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAServerAdministratorAssociatedToAMicrosoftEntraPrincipal();
}

main().catch(console.error);
