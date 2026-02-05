// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List all server administrators associated to a Microsoft Entra principal.
 *
 * @summary List all server administrators associated to a Microsoft Entra principal.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/AdministratorsMicrosoftEntraListByServer.json
 */
async function listInformationAboutAllServerAdministratorsAssociatedToMicrosoftEntraPrincipals(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const resArray = new Array();
  for await (const item of client.administratorsMicrosoftEntra.listByServer(
    resourceGroupName,
    serverName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listInformationAboutAllServerAdministratorsAssociatedToMicrosoftEntraPrincipals();
}

main().catch(console.error);
