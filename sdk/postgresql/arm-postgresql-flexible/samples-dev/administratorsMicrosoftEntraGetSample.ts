// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets information about a server administrator associated to a Microsoft Entra principal.
 *
 * @summary Gets information about a server administrator associated to a Microsoft Entra principal.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/AdministratorsMicrosoftEntraGet.json
 */
async function getInformationAboutAServerAdministratorAssociatedToAMicrosoftEntraPrincipal(): Promise<void> {
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
  const result = await client.administratorsMicrosoftEntra.get(
    resourceGroupName,
    serverName,
    objectId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getInformationAboutAServerAdministratorAssociatedToAMicrosoftEntraPrincipal();
}

main().catch(console.error);
