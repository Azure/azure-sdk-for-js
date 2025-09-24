// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Description for Create or update a database connection for a static site
 *
 * @summary Description for Create or update a database connection for a static site
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2024-11-01/examples/CreateOrUpdateStaticSiteDatabaseConnection.json
 */

import {
  DatabaseConnection,
  WebSiteManagementClient,
} from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateADatabaseConnectionForAStaticSite(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "rg";
  const name = "testStaticSite0";
  const databaseConnectionName = "default";
  const databaseConnectionRequestEnvelope: DatabaseConnection = {
    connectionIdentity: "SystemAssigned",
    connectionString:
      "AccountEndpoint=https://exampleDatabaseName.documents.azure.com:443/;Database=mydb;",
    region: "West US 2",
    resourceId:
      "/subscription/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/databaseRG/providers/Microsoft.DocumentDB/databaseAccounts/exampleDatabaseName",
  };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.createOrUpdateDatabaseConnection(
    resourceGroupName,
    name,
    databaseConnectionName,
    databaseConnectionRequestEnvelope,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateADatabaseConnectionForAStaticSite();
}

main().catch(console.error);
