// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new server administrator associated to a Microsoft Entra principal.
 *
 * @summary creates a new server administrator associated to a Microsoft Entra principal.
 * x-ms-original-file: 2026-01-01-preview/AdministratorsMicrosoftEntraAdd.json
 */
async function addAServerAdministratorAssociatedToAMicrosoftEntraPrincipal() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.administratorsMicrosoftEntra.createOrUpdate(
    "exampleresourcegroup",
    "exampleserver",
    "oooooooo-oooo-oooo-oooo-oooooooooooo",
    {
      principalName: "exampleuser@contoso.com",
      principalType: "User",
      tenantId: "tttttttt-tttt-tttt-tttt-tttttttttttt",
    },
  );
  console.log(result);
}

async function main() {
  await addAServerAdministratorAssociatedToAMicrosoftEntraPrincipal();
}

main().catch(console.error);
