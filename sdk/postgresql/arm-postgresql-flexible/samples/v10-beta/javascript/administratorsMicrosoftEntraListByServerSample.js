// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all server administrators associated to a Microsoft Entra principal.
 *
 * @summary list all server administrators associated to a Microsoft Entra principal.
 * x-ms-original-file: 2026-01-01-preview/AdministratorsMicrosoftEntraListByServer.json
 */
async function listInformationAboutAllServerAdministratorsAssociatedToMicrosoftEntraPrincipals() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.administratorsMicrosoftEntra.listByServer(
    "exampleresourcegroup",
    "exampleserver",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listInformationAboutAllServerAdministratorsAssociatedToMicrosoftEntraPrincipals();
}

main().catch(console.error);
