// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing server administrator associated to a Microsoft Entra principal.
 *
 * @summary deletes an existing server administrator associated to a Microsoft Entra principal.
 * x-ms-original-file: 2026-01-01-preview/AdministratorsMicrosoftEntraDelete.json
 */
async function deleteAServerAdministratorAssociatedToAMicrosoftEntraPrincipal() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.administratorsMicrosoftEntra.delete(
    "exampleresourcegroup",
    "exampleserver",
    "oooooooo-oooo-oooo-oooo-oooooooooooo",
  );
}

async function main() {
  await deleteAServerAdministratorAssociatedToAMicrosoftEntraPrincipal();
}

main().catch(console.error);
