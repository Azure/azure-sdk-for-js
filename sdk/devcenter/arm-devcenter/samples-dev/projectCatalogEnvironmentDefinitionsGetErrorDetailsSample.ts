// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets Environment Definition error details
 *
 * @summary Gets Environment Definition error details
 * x-ms-original-file: specification/devcenter/resource-manager/Microsoft.DevCenter/stable/2024-02-01/examples/ProjectCatalogEnvironmentDefinitions_GetErrorDetails.json
 */
async function projectCatalogEnvironmentDefinitionsGetErrorDetails(): Promise<void> {
  const subscriptionId =
    process.env["DEVCENTER_SUBSCRIPTION_ID"] || "0ac520ee-14c0-480f-b6c9-0a90c58ffff";
  const resourceGroupName = process.env["DEVCENTER_RESOURCE_GROUP"] || "rg1";
  const projectName = "DevProject";
  const catalogName = "myCatalog";
  const environmentDefinitionName = "myEnvironmentDefinition";
  const credential = new DefaultAzureCredential();
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.projectCatalogEnvironmentDefinitions.getErrorDetails(
    resourceGroupName,
    projectName,
    catalogName,
    environmentDefinitionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await projectCatalogEnvironmentDefinitionsGetErrorDetails();
}

main().catch(console.error);
