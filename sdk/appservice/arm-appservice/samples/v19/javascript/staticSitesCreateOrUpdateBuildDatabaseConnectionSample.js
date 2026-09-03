// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Create or update a database connection for a static site build
 *
 * @summary description for Create or update a database connection for a static site build
 * x-ms-original-file: 2025-05-01/CreateOrUpdateStaticSiteBuildDatabaseConnection.json
 */
async function createOrUpdateADatabaseConnectionForAStaticSiteBuild() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.createOrUpdateBuildDatabaseConnection(
    "rg",
    "testStaticSite0",
    "default",
    "default",
    {
      connectionIdentity: "SystemAssigned",
      connectionString:
        "AccountEndpoint=https://exampleDatabaseName.documents.azure.com:443/;Database=mydb;",
      region: "West US 2",
      resourceId:
        "/subscription/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/databaseRG/providers/Microsoft.DocumentDB/databaseAccounts/exampleDatabaseName",
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateADatabaseConnectionForAStaticSiteBuild();
}

main().catch(console.error);
