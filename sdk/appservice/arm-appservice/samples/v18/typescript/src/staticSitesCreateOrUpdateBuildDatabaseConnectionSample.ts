// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DatabaseConnection} from "@azure/arm-appservice";
import {
  WebSiteManagementClient,
} from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Description for Create or update a database connection for a static site build
 *
 * @summary Description for Create or update a database connection for a static site build
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/AppService/stable/2025-03-01/examples/CreateOrUpdateStaticSiteBuildDatabaseConnection.json
 */
async function createOrUpdateADatabaseConnectionForAStaticSiteBuild(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "rg";
  const name = "testStaticSite0";
  const environmentName = "default";
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
  const result = await client.staticSites.createOrUpdateBuildDatabaseConnection(
    resourceGroupName,
    name,
    environmentName,
    databaseConnectionName,
    databaseConnectionRequestEnvelope,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateADatabaseConnectionForAStaticSiteBuild();
}

main().catch(console.error);
