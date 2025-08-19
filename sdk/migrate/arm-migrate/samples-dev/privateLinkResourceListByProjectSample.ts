// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMigrateV2 } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get all private link resources created in the project. Returns a json array of objects of type 'privateLinkResources' as specified in the Models section.
 *
 * @summary Get all private link resources created in the project. Returns a json array of objects of type 'privateLinkResources' as specified in the Models section.
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/stable/2019-10-01/examples/PrivateLinkResources_ListByProject.json
 */
async function privateLinkResourcesListByProject(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] || "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName = process.env["MIGRATE_RESOURCE_GROUP"] || "madhavicus";
  const projectName = "custestpece80project";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateV2(credential, subscriptionId);
  const result = await client.privateLinkResourceOperations.listByProject(
    resourceGroupName,
    projectName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateLinkResourcesListByProject();
}

main().catch(console.error);
