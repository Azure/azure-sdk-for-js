// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AdministratorMicrosoftEntraAdd} from "@azure/arm-postgresql-flexible";
import {
  PostgreSQLManagementFlexibleServerClient,
} from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a new server administrator associated to a Microsoft Entra principal.
 *
 * @summary Creates a new server administrator associated to a Microsoft Entra principal.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/AdministratorsMicrosoftEntraAdd.json
 */
async function addAServerAdministratorAssociatedToAMicrosoftEntraPrincipal(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const objectId = "oooooooo-oooo-oooo-oooo-oooooooooooo";
  const parameters: AdministratorMicrosoftEntraAdd = {
    principalName: "exampleuser@contoso.com",
    principalType: "User",
    tenantId: "tttttttt-tttt-tttt-tttt-tttttttttttt",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result =
    await client.administratorsMicrosoftEntra.beginCreateOrUpdateAndWait(
      resourceGroupName,
      serverName,
      objectId,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await addAServerAdministratorAssociatedToAMicrosoftEntraPrincipal();
}

main().catch(console.error);
