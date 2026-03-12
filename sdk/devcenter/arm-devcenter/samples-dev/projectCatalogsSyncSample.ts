// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Syncs templates for a template source.
 *
 * @summary Syncs templates for a template source.
 * x-ms-original-file: specification/devcenter/resource-manager/Microsoft.DevCenter/stable/2024-02-01/examples/ProjectCatalogs_Sync.json
 */

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function projectCatalogsSync(): Promise<void> {
  const subscriptionId =
    process.env["DEVCENTER_SUBSCRIPTION_ID"] || "0ac520ee-14c0-480f-b6c9-0a90c58ffff";
  const resourceGroupName = process.env["DEVCENTER_RESOURCE_GROUP"] || "rg1";
  const projectName = "DevProject";
  const catalogName = "CentralCatalog";
  const credential = new DefaultAzureCredential();
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.projectCatalogs.beginSyncAndWait(
    resourceGroupName,
    projectName,
    catalogName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await projectCatalogsSync();
}

main().catch(console.error);
