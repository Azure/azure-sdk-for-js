// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about a server administrator associated to a Microsoft Entra principal.
 *
 * @summary gets information about a server administrator associated to a Microsoft Entra principal.
 * x-ms-original-file: 2026-01-01-preview/AdministratorsMicrosoftEntraGet.json
 */
async function getInformationAboutAServerAdministratorAssociatedToAMicrosoftEntraPrincipal() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.administratorsMicrosoftEntra.get(
    "exampleresourcegroup",
    "exampleserver",
    "oooooooo-oooo-oooo-oooo-oooooooooooo",
  );
  console.log(result);
}

async function main() {
  await getInformationAboutAServerAdministratorAssociatedToAMicrosoftEntraPrincipal();
}

main().catch(console.error);
